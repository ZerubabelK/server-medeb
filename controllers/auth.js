const User = require("../models/User");
const Verification = require("../models/Verification");
const bcrypt = require("bcrypt");
const createError = require("../error");
const jwt = require("jsonwebtoken");
const { PINGenerator } = require("../utils/pinGenrator");

const {
  registerValidation,
  signinValidation,
  pinValidation,
} = require("../utils/validation");

const { transporter } = require("../config/email");

module.exports = {
  signup: async (req, res, next) => {
    // Validate the inputs
    const { error } = registerValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });

    // Checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
      return res
        .status(400)
        .json({ status: "fail", message: "Email already exists" });

    try {
      const pin = PINGenerator();
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = new User({ ...req.body, password: hash });
      await newUser.save();
      const newVerification = new Verification({ pin, userId: newUser._id });
      await newVerification.save();
      var token = jwt.sign({ id: newUser._id }, process.env.JWT, {
        expiresIn: "2 days",
      });
      const { password, ...others } = newUser._doc;
      // send Verification Email
      transporter
        .sendMail({
          from: "zerubabelkassahun116@gmail.com",
          to: newUser.email,
          subject: "Verifiy yor email",
          html: `Your Verification code is ${pin}`,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));

      return res.status(200).json({ ...others, token });
    } catch (err) {
      next(err);
    }
  },

  signin: async (req, res, next) => {
    const { error } = signinValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });

    try {
      console.log(req.body);
      const user = await User.findOne({ email: req.body.email });
      if (!user) return next(createError(400, "Wrong credentials!"));

      if (!user.verified)
        return next(createError(400, "Please confirm your email to login"));

      const isCorrect = await bcrypt.compare(req.body.password, user.password);

      if (!isCorrect) return next(createError(400, "Wrong credentials!"));

      const token = jwt.sign({ id: user._id }, process.env.JWT);

      const { password, ...others } = user._doc;
      const final = { ...others, token };
      res.header("access_token", token).status(200).json(final);
    } catch (err) {
      next(err);
    }
  },

  confirmation: async (req, res, next) => {
    const { error } = pinValidation(req.body);
    if (error)
      return res
        .status(400)
        .json({ status: "fail", message: error.details[0].message });

    try {
      const code = req.body.pin;
      const verified = await Verification.find({ userId: req.params.userId });
      if (!verified) return next(createError(400, "User Not Found"));

      if (verified[0].pin !== code)
        return res.status(400).json({ message: "Wrong pin", success: false });

      await Verification.findByIdAndDelete(verified[0]._id);
      await User.findByIdAndUpdate(req.params.userId, { verified: true });
      res.status(200).json({ message: "User Verified" });
    } catch (err) {
      next(err);
    }
  },
  resendPin: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await User.findById();
      if (!user) return next(createError(400, "User Not Found"));
      const pin = PINGenerator();
      const verification = await Verification.find({
        userId: req.params.userId,
      });
      if (!verification) return next(createError(400, "User Not Found"));
      await Verification.findByIdAndUpdate(verification[0]._id, { pin });
      transporter.sendMail({
        from: "zerubabelkassahun116@gmail.com",
        to: user.email,
        subject: "Verifiy yor email",
        html: ` Your Verification code is ${pin}`,
      });
      res.status(200).json({ message: "Pin Sent" });
    } catch (err) {
      console.log(err);
    }
  },
  uploadImage: async (req, res, next) => {
    console.log(req.file);
    if (req.file) {
      res.json({
        message: "Image uploaded successfully",
        file: req.file,
      });
    } else {
      res.status(400).json({
        message: "No image selected",
      });
    }
  },
};
