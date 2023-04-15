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
  let convertedParticipantList = [];
  req.body.session.forEach((member) => {
    convertedParticipantList.push(constructParticipantSchema(member));
  });

  let existingUserSaves = await SavedSessions.findOne({
    playerName: req.body.playerName,
  }).exec();

  if (!existingUserSaves) {
    //the user hasn't made any saves yet, so we create a new save for them.
    let newSaveModel = new SavedSessions({
      playerName: req.body.playerName,
      savedSessions: [
        {
          sessionName: req.body.sessionName,
          individualSession: convertedParticipantList,
        },
      ],
    });
    const saveSuccess = await newSaveModel.save();
    if (saveSuccess) {
      res.status(201);
      res.send();
      return;
    } else {
      res.status(500);
      res.send();
      return;
    }
  } else {
    let replace = false;
    let retreivedSessions = existingUserSaves.savedSessions;
    retreivedSessions.forEach((session, index) => {
      if (session.sessionName === req.body.sessionName) {
        retreivedSessions[index] = req.body.individualSession;
        replace = true;
      }
    });
    if (!replace && retreivedSessions.length <= 3) {
      retreivedSessions.push({
        sessionName: req.body.sessionName,
        individualSession: convertedParticipantList,
      });
    }
    existingUserSaves.savedSessions = retreivedSessions;
    //update in place
    existingUserSaves.save();
  }

  res.status(200);
  res.send();
});

//UPDATING ONE

router.patch("/", async (req, res) => {});

//DELETING ONE

router.delete("/", async (req, res) => {});

module.exports = router;
