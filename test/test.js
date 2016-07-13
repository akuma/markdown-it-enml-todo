const markdownIt = require('markdown-it')
const generate = require('markdown-it-testgen')
const m = require('../')

describe('markdown-it-enml-todo', () => {
  const md = markdownIt().use(m)
  generate(`${__dirname}/fixtures/enml-todo.txt`, {header: true}, md)
})
