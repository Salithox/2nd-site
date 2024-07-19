const markdownIt = require('..src\_includes\components\markdown.js');
const outdent = require('outdent');

const customShortcode = (children) => {
  const content = markdownIt.render(children);
  return outdent`<div>${content}</div>`
}
