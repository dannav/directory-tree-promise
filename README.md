##directory-tree-promise [![Build Status](https://travis-ci.org/dannav/directory-tree-promise.svg?branch=master)](https://travis-ci.org/dannav/directory-tree-promise)

### Install
```
  npm install directory-tree-promise
```

### Usage
Use async await while traversing a directory tree.

```js
  const {directoryTree} = require('directory-tree-promise')
  const tree = await directoryTree('./example')
```

Output of `tree`:

```json
{
  "path": "./example",
  "name": "example",
  "children": [
    {
      "path": "example/subfolder",
      "name": "subfolder",
      "children": [
        // excluded
      ],
      "size": 22
    },
    {
      // excluded
    }
  ],
  "size": 34
}
```

You can also pass an async function as a second parameter to modify the object returned for files

```js
  const {directoryTree} = require('directory-tree-promise')
  const tree = await directoryTree('./example', async file => {
    file.content = await someFunctionToReadFileData(file.path)
    return file
  })
```

### Object Property Reference

Items are returned with the following properties:

- path (path to item)
- name (name of file including extension)
- extension (extension of object if isFile())
- size (file or folder size in bytes)
- children (array of items)

### API Reference

#### isFile() -> bool
Each object in the tree is extended with a function isFile

```js
  const {directoryTree} = require('directory-tree-promise')
  const tree = await directoryTree(process.cwd())
  tree.children[0].isFile() // true or false
```

### Note
Device, FIFO and socket files are ignored.

### Contributing
Fork this repository and run `npm install` in project directory.

#### Tests
`npm run test`