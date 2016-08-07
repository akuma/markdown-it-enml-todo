# markdown-it-enml-todo

[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Dependency Status][david-image]][david-url]
[![Dependency Status][david-dev-image]][david-dev-url]

[npm-image]: https://img.shields.io/npm/v/markdown-it-enml-todo.svg?style=flat-square
[npm-url]: https://npmjs.org/package/markdown-it-enml-todo
[build-image]: https://travis-ci.org/akuma/markdown-it-enml-todo.svg?branch=master
[build-url]: https://travis-ci.org/akuma/markdown-it-enml-todo
[coverage-image]: https://coveralls.io/repos/github/akuma/markdown-it-enml-todo/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/akuma/markdown-it-enml-todo?branch=master
[david-image]: https://david-dm.org/akuma/markdown-it-enml-todo.svg
[david-url]: https://david-dm.org/akuma/markdown-it-enml-todo
[david-dev-image]: https://david-dm.org/akuma/markdown-it-enml-todo/dev-status.svg
[david-dev-url]: https://david-dm.org/akuma/markdown-it-enml-todo#info=devDependencies

> ENML (Evernote Markup Language) todo (`<en-todo />`) tag plugin for markdown-it markdown parser.

## Install

```bash
npm install markdown-it-enml-todo --save
```

## Usage

```js
const md = require('markdown-it')()
  .use(require('markdown-it-enml-todo'))

const result = md.render('- [x] task 1\n- [ ] task 2')

// result is:
// <ul class="task-list">
// <li class="task-list-item"><en-todo checked="true"></en-todo> task 1</li>
// <li class="task-list-item"><en-todo></en-todo> task 2</li>
// </ul>
```

## License

[MIT](LICENSE)
