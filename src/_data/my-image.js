const eleventyImg = require("@11ty/eleventy-img");

async function generateImages() {
	const imagePath = "src/assets/gameart/";
	const imageConfig = {
		widths: [300],
		formats: ["png"],
	};

	const generatedImages = await eleventyImg(imagePath, imageConfig);

	return generatedImages;
}

generateImages()
	.then((generatedImages) => {
		// Use the generated images as needed
	})
	.catch((error) => {
		console.error("Error generating images:", error);
	});
