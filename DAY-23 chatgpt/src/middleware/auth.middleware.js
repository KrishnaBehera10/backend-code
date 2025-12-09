const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");

async function authmiddleware(req, res, next) {
  const { token } = req.cookies;

  try {
    if (!token) {
      return res.status(401).json({
        message: "token invalid",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await usermodel.findById(decode.id);

    if (!user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(501).json({
      message: "something went wrong",
    });
  }
}

module.exports = authmiddleware;
