import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';
import { getFileContent } from '@schematics/angular/utility/test';
import * as path from 'path';
import { getWorkspace } from '@schematics/angular/utility/config';
import { getProjectFromWorkspace, getProjectMainFile } from '@angular/cdk/schematics';
import { getAppModulePath } from '@schematics/angular/utility/ng-ast-utils';
// tslint:disable-next-line:max-line-length
import { NGX_SPEECH_RECOGNITION_PACKAGE_NAME, NGX_SPEECH_RECOGNITION_MODULE_NAME } from '../util/package-setting';


const collectionPath = path.join(__dirname, '../collection.json');

function createTestApp(appOptions: any = { }): UnitTestTree {
  const baseRunner = new SchematicTestRunner('schematics', collectionPath);

  const workspaceTree = baseRunner.runExternalSchematic(
    '@schematics/angular',
    'workspace',
    {
      name: 'workspace',
      version: '7.1.2',
      newProjectRoot: 'projects',
    },
  );

  return baseRunner.runExternalSchematic(
    '@schematics/angular',
    'application',
    {
      ...appOptions,
      name: 'example-app',
    },
    workspaceTree,
  );
}

describe('ngx-face-api-js-schematics', () => {
  it('addDependencies works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('ng-add', {}, createTestApp()).toPromise();

    expect(tree.files).toContain('/package.json');

    const packageJson = JSON.parse(getFileContent(tree, '/package.json'));

    expect(Object.keys(packageJson.dependencies)).toContain(NGX_SPEECH_RECOGNITION_PACKAGE_NAME);
  });

  it('addNgxFaceApiJsModule works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('ng-add', {}, createTestApp()).toPromise();

    const workspace = getWorkspace(tree);
    const project = getProjectFromWorkspace(workspace);
    const appModulePath = getAppModulePath(tree, getProjectMainFile(project));

    if (appModulePath) {
      const appModuleContent = getFileContent(tree, appModulePath);
      expect(appModuleContent).toMatch(`${NGX_SPEECH_RECOGNITION_MODULE_NAME}.forRoot`);
    }
  });
});
