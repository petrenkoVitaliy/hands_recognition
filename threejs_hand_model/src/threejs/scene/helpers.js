export function saveImage(renderer, index, CONFIG_TYPE) {
  const image = renderer.domElement.toDataURL("image/png");
  const name = `image_${index}_${CONFIG_TYPE.toLowerCase()}`;
  return { image, name };
}

export function downloadImages(initIndex, savedImages, className) {
  //let result = "";

  const downloadImage = (index) => {
    if (!savedImages[index]) {
      //console.log(result);
      return;
    }
    //console.log(index);
    const { name, image } = savedImages[index];
    const a = document.createElement("a");
    a.href = image;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    //result += `${index + initIndex},${name},${className}\n`;

    setTimeout(() => downloadImage(index + 1), 100);
  };

  downloadImage(0);
}

export function downloadObject(savedImages, currentModel, configMode) {
  var blob = new Blob([JSON.stringify(savedImages)], {
    type: "application/json;charset=utf-8",
  });
  var url = URL.createObjectURL(blob);
  var elem = document.createElement("a");
  elem.href = url;
  elem.download = `savedImages_${currentModel}_${configMode}.json`;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}

export function mergeLightConfig(config, lightConfig) {
  return {
    ...config,
    directionalLight: { ...lightConfig.directionalLight },
    enviroment: { ...lightConfig.enviroment },
    mode: `${config.mode}__${lightConfig.mode}`,
  };
}
