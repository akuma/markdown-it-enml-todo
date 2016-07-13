'use strict'

const isInline = token => token && token.type === 'inline'
const isParagraph = token => token && token.type === 'paragraph_open'
const isListItem = token => token && token.type === 'list_item_open'
const startsWithTodoMarkdown = token => token && /^\[( |x|X)\]/.test(token.content)

function isTodoItem(tokens, index) {
  return isInline(tokens[index]) &&
    isParagraph(tokens[index - 1]) &&
    isListItem(tokens[index - 2]) &&
    startsWithTodoMarkdown(tokens[index])
}

function setAttr(token, name, value) {
  const index = token.attrIndex(name)
  const attr = [name, value]

  if (index < 0) {
    token.attrPush(attr)
  } else {
    token.attrs[index] = attr
  }
}

function parentToken(tokens, index) {
  const targetLevel = tokens[index].level - 1
  for (let i = index - 1; i >= 0; i--) {
    if (tokens[i].level === targetLevel) {
      return i
    }
  }
  return -1
}

function todoify(token, TokenConstructor) {
  token.children.unshift(createTodoItem(token, TokenConstructor))

  const sliceIndex = '[ ]'.length
  token.content = token.content.slice(sliceIndex)
  token.children[1].content = token.children[1].content.slice(sliceIndex)
}

function createTodoItem(token, TokenConstructor) {
  const todo = new TokenConstructor('html_inline', '', 0)
  if (/^\[ \]/.test(token.content)) {
    todo.content = '<en-todo></en-todo>'
  } else if (/^\[(x|X)\]/.test(token.content)) {
    todo.content = '<en-todo checked="true"></en-todo>'
  }
  return todo
}

module.exports = md => {
  md.core.ruler.after('inline', 'evernote-todo', state => {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i++) {
      if (isTodoItem(tokens, i)) {
        todoify(tokens[i], state.Token)
        setAttr(tokens[i - 2], 'class', 'task-list-item')
        setAttr(tokens[parentToken(tokens, i - 2)], 'class', 'task-list')
      }
    }
  })
}
