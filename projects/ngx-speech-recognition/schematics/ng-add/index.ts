import { Rule, SchematicContext, Tree, SchematicsException, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace,
  hasNgModuleImport,
  addModuleImportToRootModule,
  getProjectMainFile,
} from '@angular/cdk/schematics';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';

import { Schema } from './Schema';
import { red, bold } from '@angular-devkit/core/src/terminal';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

// tslint:disable-next-line:max-line-length
import { NGX_SPEECH_RECOGNITION_MODULE_NAME, NGX_SPEECH_RECOGNITION_PACKAGE_NAME } from '../util/package-setting';
import { getLatestNodeVersion, NpmRegistryPackage } from '../util/npmjs';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      addDependencies(NGX_SPEECH_RECOGNITION_PACKAGE_NAME, NodeDependencyType.Default),
      installDependencies(),
      addNgxFaceApiJsModule(options),
    ])(tree, context);
  };
}

export function addDependencies(packageName: string, type: NodeDependencyType): Rule {
  return (host: Tree, context: SchematicContext): Observable<Tree> => {

    const buf = host.read('package.json');
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    return of(packageName).pipe(
      concatMap(name => getLatestNodeVersion(name)),
      map((npmRegistryPackage: NpmRegistryPackage) => {
        const nodeDependency: NodeDependency = {
          type,
          name: npmRegistryPackage.name,
          version: npmRegistryPackage.version,
          overwrite: false
        };
        addPackageJsonDependency(host, nodeDependency);
        context.logger.info(`✅️ Added dependency: ${npmRegistryPackage.name}@${npmRegistryPackage.version}`);
        return host;
      })
    );
  };
}

function installDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.info('✅️ Dependencies installed');
    return host;
  };
}

function addNgxFaceApiJsModule(options: Schema) {
  return (host: Tree, context: SchematicContext) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const appModulePath = getAppModulePath(host, getProjectMainFile(project));

    if (hasNgModuleImport(host, appModulePath, NGX_SPEECH_RECOGNITION_MODULE_NAME)) {
      return console.warn(red(
        `Could not set up "${bold(NGX_SPEECH_RECOGNITION_MODULE_NAME)}" ` +
        `because "${bold(NGX_SPEECH_RECOGNITION_MODULE_NAME)}" is already imported.`));
    }

    addModuleImportToRootModule(
      host,
      `${NGX_SPEECH_RECOGNITION_MODULE_NAME}.forRoot({ lang: 'en-US' })`,
      NGX_SPEECH_RECOGNITION_PACKAGE_NAME,
      project,
    );

    context.logger.info(`✅️ ${NGX_SPEECH_RECOGNITION_MODULE_NAME} Imported to ${appModulePath}`);
    return host;
  };
}
