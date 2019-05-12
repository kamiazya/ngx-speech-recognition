import { Rule, SchematicContext, Tree, SchematicsException, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {getWorkspace} from '@schematics/angular/utility/config';
import {
  getProjectFromWorkspace,
  hasNgModuleImport,
  addModuleImportToRootModule,
  getProjectMainFile,
} from '@angular/cdk/schematics';
import { Schema } from './Schema';
import { red, bold } from '@angular-devkit/core/src/terminal';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';

// tslint:disable-next-line:max-line-length
import { NGX_SPEECH_RECOGNITION_VERSION, NGX_SPEECH_RECOGNITION_MODULE_NAME, NGX_SPEECH_RECOGNITION_PACKAGE_NAME } from '../package-setting';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngAdd(options: Schema): Rule {
  return chain([
    addDependencies(),
    addNgxFaceApiJsModule(options),
  ]);
}

export function addDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {

    const buf = host.read('package.json');
    if (!buf) {
      throw new SchematicsException('cannot find package.json');
    }
    const content = JSON.parse(buf.toString('utf-8'));
    content.dependencies = {
      ...content.dependencies,
      [NGX_SPEECH_RECOGNITION_PACKAGE_NAME]: NGX_SPEECH_RECOGNITION_VERSION,
    };

    host.overwrite('package.json', JSON.stringify(content, null, 2));


    context.addTask(new NodePackageInstallTask());
    return host;
  };
}

function addNgxFaceApiJsModule(options: Schema) {
  return (host: Tree) => {
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

    return host;
  };
}
