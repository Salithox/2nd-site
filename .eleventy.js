module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy ("./src/css/style.css");

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};