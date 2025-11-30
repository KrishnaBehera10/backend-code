const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  urlEndpoint: process.env.URLEND_POINT,
});

const uploadImage = async (fileName, file) => {
  const response = await imagekit.upload({
    file: file,
    fileName: fileName,
    folder: "/caption/",
  });

  return response;
};

module.exports = uploadImage;
