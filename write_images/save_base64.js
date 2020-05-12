const fs = require("fs").promises;

const IMAGE_CLASSES = {
  SPOKE: "spoke",
  DEFAULT: "default",
};

const imageClass = IMAGE_CLASSES.DEFAULT;

async function writeImages(images) {
  for (let i = 0; i < images.length; i++) {
    const { image, name } = images[i];
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    await fs.writeFile(
      `../synthetic_photos/${imageClass}/${name}.png`,
      base64Data,
      "base64"
    );
  }
}

const filename = "savedImages_default_modified_light_2.json";
const images = JSON.parse(require("fs").readFileSync(filename));

writeImages(images);
