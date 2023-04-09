const express = require("express");
const {
  generateToken,
  verifyToken,
  constructParticipantSchema,
} = require("../helpers/helpers");
const router = express.Router();

const Participant = require("../models/participant");
const SavedIndividualSession = require("../models/savedIndividualSession");
const SavedSessions = require("../models/savedSessions");

const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const savedSessions = require("../models/savedSessions");

//GET ALL

router.get("/", async (req, res) => {
  console.log("this is an appropriate endpoint");
});

//GET ONE

router.get("/:id", async (req, res) => {});

//GET ONE BY NAME

router.get("/:name", async (req, res) => {});

//CREATING ONE

router.post("/", async (req, res) => {
  console.log(req.body.session);
  let convertedParticipantList = [];
  req.body.session.forEach((member) => {
    convertedParticipantList.push(constructParticipantSchema(member));
  });
  let p1 = new savedSessions({
    playerName: req.body.playerName,
    savedSessions: [
      {
        sessionName: req.body.sessionName,
        individualSession: convertedParticipantList,
      },
    ],
  });
  console.log(p1);
  console.log(convertedParticipantList);
  const isDone = await p1.save();
  console.log(isDone);
});

//UPDATING ONE

router.patch("/", async (req, res) => {});

//DELETING ONE

router.delete("/", async (req, res) => {});

module.exports = router;
