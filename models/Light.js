const mongoose = require("mongoose");

const lightSchema = mongoose.Schema({
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    status:{
        type: Boolean,
        default: false
    },
    brightness:{
        type: Number,
        default: 0
    },
    color: {
        r: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        },
        g: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        },
        b: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        }
    }
})

module.exports = mongoose.model("Light", lightSchema);