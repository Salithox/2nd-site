const markdownIt = require('./markdown');
const outdent = require('outdent');

const customShortcode = (children) => {
  const content = markdownIt.render(children);
  return outdent`<div>${content}</div>`
}