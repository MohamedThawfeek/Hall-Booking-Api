const express = require("express");
const router = express.Router();
const Room = require("../model/room");

router.get("/", (req, res) => {
  res.send("Room router is working");
});

router.post("/add", async (req, res) => {
  try {
    const data = await Room.create(req.body);
    res.json(data);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const datas = await Room.find({})
      .populate("customer", "-_id ")
      .select("-_id -assets");
    res.json(datas);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
