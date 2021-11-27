const router = require("express").Router();
const Customer = require("../model/customer");
const Room = require("../model/room");

router.get("/", (req, res) => {
  res.send("Customer router is working");
});

router.post("/add", async (req, res) => {
  try {
    const customerdata = await {
      name: req.body.name,
      address: req.body.address,
      identity: req.body.identity,
      date: new Date(req.body.date),
      start_time: new Date(req.body.start_time),
      end_time: new Date(req.body.end_time),
      roomId: req.body.roomId,
      createdAT: req.body.createdAT,
    };

    const data = await Customer.create(customerdata);
    const roomdata = await Room.findByIdAndUpdate(
      { _id: data.roomId },
      {
        $push: { customer: data._id },
      },
      { new: true }
    );
    res.json({ customer: data, room: roomdata });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const datas = await Customer.find({})
      .populate("roomId", "-_id -customer")
      .select("-_id");
    res.json(datas);
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
