const express = require("express");
const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password must required",
      });
    }

    const existingUser = await usermodel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await usermodel.create({ username, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "Signup successfully",
      user: {
        id: user._id,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not signup",
    });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password must required",
      });
    }

    const user = await usermodel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "user not exist",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "password not correct",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "successfully login",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
    });
  }
});

//user

router.get("/user", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(400).json({
        message: "unauthorize",
      });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decode);

    const user = await usermodel.findOne({ _id: decode.id });

    if (!user) {
      return res.status(400).json({
        message: "not found",
      });
    }

    return res.status(200).json({
      message: "user authenticate",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "unAuthorized",
      error,
    });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "logout successfully",
  });
});

module.exports = router;
