const express = require("express");
const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password must required",
      });
    }

    const user = await usermodel.create({ username, password });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token); // send cookies
    return res.status(201).json({
      message: "register successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "could not register",
    });
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password must be required",
      });
    }

    const user = await usermodel.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "password invalid",
      });
    }

    return res.status(200).json({
      message: "login successfully",
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

// authorize user

router.get("/user", async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await usermodel
      .findOne({ id: decoded._id })
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User authorized",
      user,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
});

module.exports = router;
