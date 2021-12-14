# axi-react-file-browser
forked from uptick/react-keyed-file-browser
https://github.com/uptick/react-keyed-file-browser

Folder based file browser given a flat keyed list of objects, powered by React.

## Installation

In developing ...

<!--Install the package with npm:

```bash
# NPM
npm install axi-react-file-browser

# Yarn
yarn add axi-react-file-browser
```-->

## Usage

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

import FileBrowser from 'axi-react-file-browser'

ReactDOM.render(
  <FileBrowser
    files={[]}
  />,
  document.getElementById('root')
);
```

Include icons from FontAwesome 4:

```javascript
import React from 'react'
import ReactDOM from 'react-dom'

import FileBrowser, { Icons } from 'axi-react-file-browser'

// this imports the FontAwesome Icon Styles
import 'font-awesome/css/font-awesome.min.css'

var mount = document.querySelectorAll('div.browser-mount');
ReactDOM.render(
  <FileBrowser
    files={[]}
    icons={Icons.FontAwesome(4)}
    lang='auto'
  />,
  mount[0]
);
```

or your own icons by specifying as so:
```javascript
  <FileBrowser
    files={[]}
    icons={{
      File: <i className="file" aria-hidden="true" />,
      Image: <i className="file-image" aria-hidden="true" />,
      PDF: <i className="file-pdf" aria-hidden="true" />,
      Rename: <i className="i-cursor" aria-hidden="true" />,
      Folder: <i className="folder" aria-hidden="true" />,
      FolderOpen: <i className="folder-open" aria-hidden="true" />,
      Delete: <i className="trash" aria-hidden="true" />,
      Loading: <i className="circle-notch spin" aria-hidden="true" />,
    }}
  />
```

Supported localization language types: 'ru', 'en', 'auto'

Optionally, include the built css with an import:

```scss
@import 'node_modules/axi-react-file-browser/dist/axi-react-file-browser.css';
```
or tag:

```html
<link
  href="static/node_modules/axi-react-file-browser/dist/axi-react-file-browser.css"
  rel="stylesheet"
>
```
## Examples

Using a custom drag and drop provider.
```javascript
import { RawFileBrowser } from 'axi-react-file-browser'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

<DndProvider backend={HTML5Backend}>
  <RawFileBrowser files={[]}/>
</DndProvider>
```
