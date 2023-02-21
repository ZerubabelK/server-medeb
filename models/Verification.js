const mongoose = require("mongoose");

const verificationSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  pin: {
    type: String,
  },
});

module.exports = mongoose.model("verification", verificationSchema);
