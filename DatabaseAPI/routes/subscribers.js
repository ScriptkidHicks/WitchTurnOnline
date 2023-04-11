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
    let user = await Subscriber.findOne({ name: req.body.name }).exec();
    if (user) {
      console.log(user);
      console.log("PASSSSSSSSSSSSSSSSSSSSS " + user.hashedPassword);
      const match = await bcrypt.compare(
        req.body.password,
        user.hashedPassword
      );
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
      if (!decoded) {
        res.status(401);
        res.send("Invalid token");
        return;
      }

      let subReference = await Subscriber.findOne({
        name: decoded.userName,
      }).select("-hashedPassword");
      if (subReference) {
        res.status(200);
        res.send();
        return;
      } else {
        //this isn't an error state. They might be allowed to access a page without
        //having a token
        res.status(401);
      }
    } catch (error) {
      res.status(401);
      throw new Error("not authorized");
    }
  } else {
    res.status(401);
    throw new Error("not authorized");
  }
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

  let nameUser = await Subscriber.findOne({ name: req.body.name }).exec();
  let emailUser = await Subscriber.findOne({ email: req.body.email }).exec();

  if (nameUser || emailUser) {
    res.status(409);
    res.send("User already exists");
    return;
  }
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);
  const subscriber = new Subscriber({
    name: req.body.name,
    hashedPassword: hashedPassword,
    email: req.body.email,
  });

  try {
    const newSubscriber = await subscriber.save();
    console.log(newSubscriber);
    res.status(201);
    res.send({
      jwt: jwt.sign({ userName: req.body.name }, process.env.JWT_SECRET),
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
  res.send();
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
