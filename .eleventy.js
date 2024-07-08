// not needed, but leaving here in case I want it later
const { EleventyRenderPlugin } = require("@11ty/eleventy");
// import luxon for post datetime conversion
const { DateTime } = require("luxon");
// fast glob for iterating over folders and including files, used for images etc
const fg = require('fast-glob');
// for excerpt rendering markdown to HTML
const markdownIt = require("markdown-it");
// for atom/rss feed
// const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy ("./src/css/style.css");
    eleventyConfig.addPassthroughCopy ("./src/components/");
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toLocaleString(DateTime.DATE_MED);
      });

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};