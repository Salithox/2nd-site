module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy ("./src/css/style.css");
    eleventyConfig.addPassthroughCopy ("./src/components/");

    return {
        dir: {
            input: "src",
            output: "public",
        },
    };
};