const jwt = require("jsonwebtoken");
const usermodel = require("../models/user.model");
const bcrypt = require("bcrypt");

// REGISTER USER
async function registeruser(req, res) {
  try {
    const {
      email,
      fullname: { firstname, lastname },
      password,
    } = req.body;

    if (!email || !firstname || !lastname || !password) {
      return res.status(400).json({
        message: "email, fullname and password are required",
      });
    }

    const existuser = await usermodel.findOne({ email });

    if (existuser) {
      return res.status(400).json({
        message: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await usermodel.create({
      email,
      fullname: { firstname, lastname },
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "user register successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error,
    });
  }
}

// LOGIN USER
async function loginuser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "email and password are required",
      });
    }

    // FIXED: find user (not create)
    const user = await usermodel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "incorrect password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      message: "user login successfully",
      user: {
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error,
    });
  }
}

module.exports = { registeruser, loginuser };
