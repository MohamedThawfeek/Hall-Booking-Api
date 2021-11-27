const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  room_no: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    required: true,
  },
  capacity: Number,
  assets: {
    ac: {
      type: Boolean,
      default: false,
    },
    tv: {
      type: Boolean,
      default: false,
    },
    internet_connection: {
      type: Boolean,
      default: false,
    },
  },
  price: {
    type: Number,
    required: true,
  },
  customer: [
    {
      type: mongoose.Types.ObjectId,
      ref: "customer",
    },
  ],
});

const Room = mongoose.model("room", roomSchema);

module.exports = Room;
