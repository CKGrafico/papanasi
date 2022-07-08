<h1 align="center">
  <a href="#"><img src="https://raw.githubusercontent.com/CKGrafico/papanasi/main/docs/resources/logo-text.svg"  width="400" alt="Papanasi"></a>
  <p align="center">The Universal UI Library</p>
</h1>

### 🔍 Overview

🥯Papanasi is a **UI library to use cross Frameworks**. A set of components to use in Angular, React, Solid, Svelte, Vue and Web Components. Is based on the [Mitosis](https://github.com/BuilderIO/mitosis) library and documented using [Storybook](https://storybook.js.org/).

> WARNING: THIS IS AN ALPHA DONT USE IT YET, IS UNDER DEVELOPMENT.

<p align="center">
  <a href="https://github.com/CKGrafico/Papanasi/blob/main/LICENSE"><img src="https://img.shields.io/github/license/CKGrafico/Papanasi.svg?logo=creative%20commons&color=8FBFA9&logoColor=FFFFFF" alt="GitHub license" /></a>
  <a href="https://github.com/CKGrafico/Papanasi/network"><img src="https://img.shields.io/github/stars/CKGrafico/Papanasi.svg?logo=verizon&color=4D8C6F" alt="GitHub stars" /></a>
  <a href="https://github.com/CKGrafico/Papanasi/network"><img src="https://img.shields.io/github/forks/CKGrafico/Papanasi.svg?logo=github&color=38A3A5" alt="GitHub forks" /></a>
  <a href="https://twitter.com/CKGrafico"><img src="https://img.shields.io/badge/Tweet-project?logo=twitter&color=00acee&logoColor=FFFFFF" alt="Tweet" /></a>
  <a href="https://github.com/sponsors/CKGrafico"><img src="https://img.shields.io/badge/Support-project?logo=ko-fi&color=ea4aaa&logoColor=FFFFFF" alt="Sponsor" /></a>
  <a href="https://travis-ci.org/CKGrafico/Papanasi"><img src="https://travis-ci.org/CKGrafico/Papanasi.svg?logo=travis&branch=basic" alt="Build Status" /></a>
  <a href="https://github.com/CKGrafico/Papanasi/issues"><img src="https://img.shields.io/github/issues/CKGrafico/Papanasi.svg?logo=codeigniter&logoColor=FFFFFF" alt="GitHub issues" /></a>
  <a href="https://github.com/CKGrafico/Papanasi/releases"><img src="https://img.shields.io/badge/Update%20status-Frequently-009C7C?logo=git&logoColor=FFFFFF" alt="Update Status" /></a>

</p>

This library born as a pet project to create universal components, easy to extend in any project and easy to use with any framework, is based in the next **manifesto**:

**A Component**...
* ...should be **cross-libraries** but the code should be written once.
* ...should have a **minimun style** and should be easy to extend it via CSS by the user.
* ...should provide some  **optional themes** to make it easy to use.
* ...should be **accesible**.
* ...should be **made for developers** not for non-coders, they will decide how to style most of the things.
* ...should be three-shakable.
* ...should be compatible with **StoryBook**.
* ...should be inspired in other UI Libraries to **don't reinvent the wheel**.
* ...should be easy to create new **variants**.

### 📚 Setup and scripts

```shell
$ npm install @papanasi/solid
```

```shell
$ yarn add @papanasi/solid
```

### 🧩 Platforms 
<table align="center">
  <tr>
    <td align="center" width="100">
      <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/angular-icon.svg" width="50" title="Angular"> <br/>
      <strong>Angular</strong> <br/>
      <sub>
        <a href="https://github.com/CKGrafico/papanasi/blob/main/packages/angular/README.md#-setup-and-scripts" target="_blank">📗Readme</a>
        <a href="https://codesandbox.io/s/papanasi-angular-7bzn8h" target="_blank">📦Sandbox</a>
      </sub>
    </td>
    <td align="center" width="100">
      <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/react.svg" width="50" title="React"> <br/>
      <strong>React</strong> <br/>
      <sub>
        <a href="https://github.com/CKGrafico/papanasi/blob/main/packages/react/README.md#-setup-and-scripts" target="_blank">📗Readme</a>
        <a href="https://codesandbox.io/s/papanasi-react-orfn30" target="_blank">📦Sandbox</a>
      </sub>
    </td>
    <td align="center" width="100">
      <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/solidjs-icon.svg" width="50" title="Solid"> <br/>
      <strong>Solid</strong> <br/>
      <sub>
        <a href="https://github.com/CKGrafico/papanasi/blob/main/packages/solid/README.md#-setup-and-scripts" target="_blank">📗Readme</a>
        <a href="https://codesandbox.io/s/papanasi-solid-5y3xb8" target="_blank">📦Sandbox</a>
      </sub>
    </td>
    <td align="center" width="100">
      <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/svelte-icon.svg" width="45" title="Svelte"> <br/>
      <strong>Svelte</strong> <br/>
      <sub>
        <a href="https://github.com/CKGrafico/papanasi/blob/main/packages/svelte/README.md#-setup-and-scripts" target="_blank">📗Readme</a>
        <a href="https://codesandbox.io/s/papanasi-svelte-00ul5x" target="_blank">📦Sandbox</a>
      </sub>
    </td>
    <td align="center" width="100">
      <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/vue.svg" width="50" title="Vue"> <br/>
      <strong>Vue</strong> <br/>
      <sub>
        <a href="https://github.com/CKGrafico/papanasi/blob/main/packages/vue/README.md#-setup-and-scripts" target="_blank">📗Readme</a>
        <a href="https://codesandbox.io/s/papanasi-vue-vygq4m" target="_blank">📦Sandbox</a>
      </sub>
    </td>
    <td align="center" width="100">
      <img src="https://raw.githubusercontent.com/gilbarbara/logos/master/logos/w3c.svg" width="80" title="Web Components"> <br/>
      <strong>Standard</strong> <br/>
      <sub>
        <a href="https://github.com/CKGrafico/papanasi/blob/main/packages/webcomponent/README.md#-setup-and-scripts" target="_blank">📗Readme</a>
        <a href="https://codesandbox.io/s/papanasi-webcomponents-27zsfr" target="_blank">📦Sandbox</a>
      </sub>
    </td>
  </tr>
</table>

### 🔨 Components status

<table align="center">
  <tr>
    <td align="left" colspan="4">
     <h4>Layout Components</h4>
    </td>
  </tr>
  <tr>
    <td align="center">
      Container <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/layout-container--default-story">Preview</a>
    </td>
    <td align="center">
      Row <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/layout-row--default-story">Preview</a>
    </td>
    <td align="center">
      Column <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/layout-column--default-story">Preview</a>
    </td>
    <td align="center">
      Grid <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/layout-grid--default-story">Preview</a>
    </td>
  </tr>
  <tr>
    <td  align="left" colspan="4">
     <h4>Regular Components</h4>
    </td>
  </tr>
  <tr>
    <td align="center">
      Avatar <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/components-avatar--default-story">Preview</a>
    </td>
    <td align="center">
      Button <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/components-button--default-story">Preview</a>
    </td>
    <td align="center">
      Code <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/components-code--default-story">Preview</a>
    </td>
    <td align="center">
      Pill <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/components-pill--default-story">Preview</a>
    </td>
    
  </tr>
   <tr>
    <td align="center">
      Select <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/0"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/components-select--default-story">Preview</a>
    </td>
     <td align="center">
      Spinner <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/100"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/components-spinner--default-story">Preview</a>
    </td>
  </tr>
  <tr>
    <td align="left" colspan="4">
     <h4>Enterprise Components</h4>
    </td>
  </tr>
  <tr>
    <td align="center">
      Itchio <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/80"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/enterprise-itchio--default-story">Preview</a>
    </td>
  </tr>
  <tr>
    <td align="left" colspan="4">
     <h4>Extensions</h4>
    </td>
  </tr>
  <tr>
    <td align="center">
      Tooltip <br/>
      <img src="https://us-central1-progress-markdown.cloudfunctions.net/progress/50"/><br/>
      <a href="https://papanasi.js.org/?path=/docs/extensions-tooltip--default-story">Preview</a>
    </td>
  </tr>
</table>

### 📗 Documentation

To learn more about Papanasi, check [the documentation](http://papanasi.js.org/).

### 📃 License

[MIT](http://opensource.org/licenses/MIT)

### 🚀 Contributing

[Contributing Guidelines](https://github.com/CKGrafico/papanasi/blob/main/CONTRIBUTING.md)
