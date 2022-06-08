import lernaJson from '../../lerna.json';
import { generateCodeSandboxLink } from './codesandbox.helper';

export function generateAngularCodeSandboxLink(options) {
  const { components, code, dependencies } = options;

  const html = `<div class="app"><app-root></app-root></div>`;

  const demoCode = `
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Component } from "@angular/core";
import '@papanasi/angular/dist/papanasi.css';

import { ${components.join(', ')} } from '@papanasi/angular';

@Component({
  selector: "app-root",
  template: \`${code}\`
})
export class AppComponent {
  title = "App";
}

@NgModule({
  declarations: [AppComponent, ${components.join(', ')}],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.log(err));
`.trim();

  const packageJson = {
    main: './index.ts',
    scripts: {
      ng: 'ng',
      start: 'ng serve'
    }
  };

  const projectDependencies = {
    ...dependencies,
    '@angular/common': '^12.2.0',
    '@angular/compiler': '^12.2.0',
    '@angular/core': '^12.2.0',
    '@angular/platform-browser': '^12.2.0',
    '@angular/platform-browser-dynamic': '^12.2.0',
    'core-js': '3.8.3',
    rxjs: '6.6.3',
    'zone.js': '0.11.3',
    '@papanasi/angular': `${lernaJson.version}`
  };

  const devDependencies = {
    '@angular-devkit/build-angular': '^0.1102.0',
    '@angular/cli': '^12.2.0',
    '@angular/compiler-cli': '^12.2.0',
    '@angular/language-service': '^12.2.0',
    '@types/node': '14.14.28',
    'ts-node': '9.1.1',
    typescript: '4.1.5'
  };

  const tsconfig = `
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "es2015",
    "module": "es2020",
    "lib": [
      "es2018",
      "dom"
    ]
  }
}
  `;

  const cliConfig = `
{
  "apps": [
    {
      "root": "",
      "index": "index.html"
    }
  ]
}
  `;

  const extraFiles = {
    'tsconfig.json': {
      content: tsconfig
    },
    '.angular-cli.json': {
      content: cliConfig
    }
  };

  const generated = generateCodeSandboxLink({
    isTypescript: true,
    html,
    demoCode,
    packageJson,
    dependencies: projectDependencies,
    devDependencies,
    extraFiles
  });

  return generated;
}
