const express = require("express");
const usermodel = require("../model/user.model");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }

    const user = await usermodel.create({ username, password });

    return res.status(201).json({
      message: "signup successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "could not signup",
    });
  }
});

//login user

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "username and password are required",
      });
    }

    const user = await usermodel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    // check password
    if (user.password !== password) {
      return res.status(401).json({
        message: "invalid password",
      });
    }

    return res.status(200).json({
      message: "successfully login",
      user: {
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error",
    });
  }
});

module.exports = router;
