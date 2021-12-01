const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  identity: {
    license: {
      type: String,
    },
    passport: {
      type: String,
    },
    aadhar: {
      type: String,
    },
  },
  date: {
    type: Date,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Types.ObjectId,
    ref: "room",
  },
  createdAT: {
    type: Date,
    default: Date.now(),
  },
});

customerSchema.index(
  {
    start_time: 1,
    end_time: 1,
    roomId: 1,
  },
  { unique: true }
);

const Customer = mongoose.model("customer", customerSchema);

module.exports = Customer;
