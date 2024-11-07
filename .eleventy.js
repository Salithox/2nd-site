// not needed, but leaving here in case I want it later
module.exports = async function() {
	const {eleventyRenderPlugin, EleventyI18Plugin, EleventyHtmlBasePlugin} = await import("@11ty/eleventy");	
}

// const { EleventyRenderPlugin } = require("@11ty/eleventy");
// import luxon for post datetime conversion
const { DateTime } = require("luxon");
// fast glob for iterating over folders and including files, used for images etc
const fg = require('fast-glob');
// for excerpt rendering markdown to HTML
const markdownIt = require("markdown-it");
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs')
// for atom/rss feed
// const pluginRss = require("@11ty/eleventy-plugin-rss");
// const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)
const Image = require("@11ty/eleventy-img")
const path = require('path')

// remark containers section
// const unified = require('unified')
// const unified = require('unified')
// const parse = require('remark-parse')
const containers = require('remark-containers')
// const stringify = require('rehype-stringify')
// const remark2rehype = require('remark-rehype')

// End remark containers section

const markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  }
  
  let markdownItAnchorOptions = {
    level: 2 // minimum level header -- anchors will only be applied to h2 level headers and below but not h1
}

  module.exports = (eleventyConfig) => {
    eleventyConfig.setLibrary('md', markdownIt);
  }




module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy ("./src/css/style.css");
    eleventyConfig.addPassthroughCopy ("./src/css/components/");
    eleventyConfig.addPassthroughCopy ("./src/components/");
    eleventyConfig.addPassthroughCopy ("./src/assets/");
	eleventyConfig.setLibrary("md", markdownIt().use(markdownItAnchor).use(markdownItAttrs))
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toLocaleString(DateTime.DATE_MED);
	//eleventyConfig.addPlugin(UpgradeHelper);
      });

    	// --- START, eleventy-img
	function imageShortcode(src, alt, sizes="(min-width: 1024px) 100vw, 50vw") {
		console.log(`Generating image(s) from:  ${src}`)
		let options = {
			widths: [50, 100],  //  150, 200, 600, 900, 1500
  			formats: ["webp", "jpeg"],
			urlPath: "/assets/gameart/thumbnail",
			outputDir: "./public/assets/gameart/thumbnail",
			filenameFormat: function (id, src, width, format, options) {
				const extension = path.extname(src)
				const name = path.basename(src, extension)
				return `${name}-${width}w.${format}`
			}
		}

		// generate images
		Image(src, options)

		let imageAttributes = {
			alt,
			sizes,
			loading: "lazy",
			decoding: "async",
		}
		// get metadata
		metadata = Image.statsSync(src, options)
		return Image.generateHTML(metadata, imageAttributes)
	}
	eleventyConfig.addShortcode("image", imageShortcode)
	// --- END, eleventy-img


// Countdown timer function
function countdown(yy, mm, dd) {
  const countDownDate = new Date(yy, mm - 1, dd).getTime();
  const intervalId = setInterval(() => {
	const now = new Date().getTime();
	const distance = countDownDate - now;
	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);
	const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	document.querySelector(".timer").innerHTML = countdownText;
  }, 1000);
}

// Add Eleventy shortcode
eleventyConfig.addShortcode("CountDown", countdown)
	

	

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "public",
        },
    };
};