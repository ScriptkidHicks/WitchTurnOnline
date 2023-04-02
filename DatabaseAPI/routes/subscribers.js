const express = require("express");
const { generateToken, verifyToken } = require("../helpers/helpers");
const router = express.Router();
const Subscriber = require("../models/subscriber");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

module.exports = router;

router.post("/login", async (req, res) => {
  console.log("login has been touched");
  if (req.body.name && req.body.password) {
    console.log("both are present");
    console.log("name " + req.body.name);
    let user = await Subscriber.findOne({ name: req.body.name }).exec();
    console.log("user " + user);
    if (user) {
      console.log(user);
      console.log("PASSSSSSSSSSSSSSSSSSSSS " + user.hashedPassword);
      const match = await bcrypt.compare(
        req.body.password,
        user.hashedPassword
      );
      console.log(match);
      console.log(req.body.hashedPassword);
      console.log(user.hashedPassword);
      if (match) {
        res.status(200);
        res.send({
          jwt: jwt.sign({ userName: req.body.name }, process.env.JWT_SECRET),
        });
        return;
      } else {
        res.status(401);
      }
    } else {
      res.status(401);
    }
  } else {
    res.status(401);
  }

  res.send();
});

//VERIFY ONE

router.get("/Verify", async (req, res) => {
  console.log("verify has been touched");
  let token;
  req.headers.authorization;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // retreive token
      token = req.headers.authorization.split(" ")[1];

      const decoded = verifyToken(token);

      let subReference = await Subscriber.findById(decoded.userId).select(
        "-hashedPassword"
      );
      if (subReference) {
        res.status(200);
      } else {
        res.status(401);
        throw new Error("Not authorized");
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  } else {
    res.status(401);
    throw new Error("not authorized");
  }

  res.send();
});

//GETTING ALL

router.get("/", async (req, res) => {
  console.log("I have been touched (all subs)");
  try {
    const subscribers = await Subscriber.find();
    console.log(subscribers);
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
  console.log("I am creating a new one");

  let nameUser = Subscriber.find({ name: req.body.name });
  let emailUser = Subscriber.find({ email: req.body.email });

  if (nameUser || emailUser) {
    res.status(409);
    res.send("User already exists");
    return;
  }
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
  console.log("getting by name");
  console.log(req.params.id);
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
