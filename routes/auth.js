const express = require("express");
const {
  signup,
  signin,
  confirmation,
  resendPin,
  uploadImage,
} = require("../controllers/auth.js");
const authentication = require("../middleware/authentication.js");
const { upload } = require("../utils/image.js");

const router = express.Router();

router
  .post("/signup", signup)
  .post("/login", signin)
  .post("/confirmCode/:userId", confirmation)
  .get("/resendOTP/:id", resendPin)
  .post("/upload", authentication, upload.single("image"), uploadImage);
module.exports = router;
