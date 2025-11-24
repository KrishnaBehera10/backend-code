const express = require("express");

const router = express.Router();

//router level middlware
router.use((req, res, next) => {
  console.log("this middlware is between router and api");
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({
    message: "successfully getdata",
  });
});

module.exports = router;
