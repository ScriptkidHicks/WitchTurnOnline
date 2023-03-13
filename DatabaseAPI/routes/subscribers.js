const express = require("express");
const subscriber = require("../models/subscriber");
const router = express.Router();
const Subscriber = require("../models/subscriber");

module.exports = router;

//GETTING ALL

router.get("/", async (req, res) => {
  console.log("I have been touched");
  console.log(req.originalUrl);
  console.log(req.baseUrl);
  console.log(req.hostname);
  try {
    const subscribers = await Subscriber.find();
    res.json({ subscribers: subscribers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GETTING ONE

router.get("/:id", getSubscriberByName, (req, res) => {
  res.send(res.subscriber.name);
});

//CREATING ONE

router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    hashedPassword: req.body.hashedPassword,
    email: req.body.email,
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//UPDATING ONE

router.patch("/:id", getSubscriberById, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }

  try {
    const updatedSubscriber = await res.subscriber.save();
    res.status(200).json({ message: updatedSubscriber });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETING ONE

router.delete("/:id", getSubscriberById, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//MIDDLEWARE

async function getSubscriberById(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.subscriber = subscriber;
  next();
}

async function getSubscriberByName(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findOne({ name: req.params.id });
    if (subscriber == null) {
      return res.status(404).json({ message: "Cannot find subscriber" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.subscriber = subscriber;
  next();
}
