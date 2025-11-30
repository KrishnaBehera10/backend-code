const postmodel = require("../model/post.model");
const aicaptiongenerate = require("../service/ai.service");
const uploadImage = require("../service/store.service");

const postcontroller = async (req, res) => {
  const file = req.file;
  const user = res.user;

  const base64Image = new Buffer.from(file.buffer).toString("base64"); //base64 string

  const caption = await aicaptiongenerate(base64Image); //ai generated caption

  const uploadResponse = await uploadImage(file.originalname, file.buffer); //upload to imagekit

  const newpost = await postmodel.create({
    caption: caption,
    imgurl: uploadResponse.url,
    userId: user._id,
  });

  res.status(201).json({ message: "Post created successfully", post: newpost });
};
module.exports = postcontroller;
