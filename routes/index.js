const express = require("express");
const router = express.Router();

const roomRouter = require("./room");
const customerRouter = require("./customer");

router.use("/rooms", roomRouter);

router.use("/customers", customerRouter);

module.exports = router;
