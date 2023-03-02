const express = require("express");
const router = express.Router();
const Subscriber = require("../models/subscriber");

module.exports = router;

//GETTING ALL

router.get("/", (req, res) => {
  res.send("hello world");
});

//GETTING ONE

router.get("/:id", (req, res) => {});

//CREATING ONE

router.post("/", (req, res) => {});

//UPDATING ONE

router.patch("/:id", (req, res) => {});

//DELETING ONE

router.delete("/:id", (req, res) => {});
