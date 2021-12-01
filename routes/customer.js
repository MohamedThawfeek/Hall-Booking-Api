const router = require("express").Router();
const Customer = require("../model/customer");
const Room = require("../model/room");

router.get("/", (req, res) => {
  res.send("Customer router is working");
});

router.post("/add", async (req, res) => {
  try {
    const customerdata = {
      name: req.body.name,
      address: req.body.address,
      identity: req.body.identity,
      date: req.body.date,
      start_time: new Date(req.body.start_time),
      end_time: new Date(req.body.end_time),
      roomId: req.body.roomId,
      createdAT: req.body.createdAT,
    };

    const data = await Customer.create(customerdata);
    const check_data = await Customer.find({
      $or: [
        {
          start_time: {
            $gt: data.start_time,
            $lt: data.end_time,
          },
        },
        {
          end_time: {
            $gt: data.start_time,
            $lt: data.end_time,
          },
        },
      ],
    });

    const roomdata = await Room.findByIdAndUpdate(
      { _id: data.roomId },
      {
        $push: { customer: data._id },
      },
      { new: true }
    );
    res.json({ customer: data, chech: check_data, room: roomdata });
  } catch (error) {
    res.json({
      msg: "Hall could not be booked. Please choose different dates.",
    });
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
