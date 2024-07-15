// not needed, but leaving here in case I want it later
const { EleventyRenderPlugin } = require("@11ty/eleventy");
// import luxon for post datetime conversion
const { DateTime } = require("luxon");
// fast glob for iterating over folders and including files, used for images etc
const fg = require('fast-glob');
// for excerpt rendering markdown to HTML
const markdownIt = require("markdown-it");
const markdownItAttrs = require('markdown-it-attrs')
// for atom/rss feed
// const pluginRss = require("@11ty/eleventy-plugin-rss");


const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  }
  
  const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)


//const markdownIt = require('./markdown.js');
/*
module.exports = (eleventyConfig) => {
  eleventyConfig.setLibrary('md', markdownIt);
}
*/


function arttag(content) {
  return `
    <article>
      ${content}
    </article>
  `.replace(/(\r\n|\n|\r)/gm, "");;
}


module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy ("./src/css/style.css");
    eleventyConfig.addPassthroughCopy ("./src/components/");
    eleventyConfig.setLibrary('md', markdownLib)
    eleventyConfig.addShortcode('article', arttag);
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toLocaleString(DateTime.DATE_MED);
      });
    eleventyConfig.addFilter("md", function (content = "") {
        return markdownIt({ html: true }).render(content);
      });
    
    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};