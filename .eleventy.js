// not needed, but leaving here in case I want it later
const { EleventyRenderPlugin } = require("@11ty/eleventy");
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


// ---- Start countdown clock

// Set the date we're counting down to
function myTimer(yy,mm,dd) {
	var countDownDate = new Date(yy,mm,dd).getTime();
	
	// Update the count down every 1 second
	var x = setInterval(function() {
	  // Get today's date and time
	  var now = new Date().getTime();
	  
	  // Find the distance between now and the count down date
	  var distance = countDownDate - now;
	  
	  // Time calculations for days, hours, minutes and seconds
	  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	  
	  // Return the result as a string
	  var countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
	  
	  // Update an external element or variable with the new value
	  // For example, update an HTML element with the id "countdown"
	  document.getElementById("countdown").innerHTML = countdownText;
	}, 1000); // 1000ms = 1s
  }
  
  eleventyConfig.addShortcode("CountDown", function(yy, mm, dd) {
	myTimer(yy, mm, dd);
  });
	// --- End countdown clock
	

	

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "public",
        },
    };
};