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
  const ses = await SavedSessions.find();
  console.log(ses);
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
  console.log(convertedParticipantList);

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
    let found = false;
    let retreivedSessions = existingUserSaves.savedSessions;
    let saveOutSessions = [];
    retreivedSessions.forEach((session, index) => {
      if (session.sessionName === req.body.sessionName) {
        //If we find a copy, then replace one;
        saveOutSessions.push({
          sessionName: req.body.sessionName,
          individualSession: convertedParticipantList,
        });
      } else {
        saveOutSessions.push(session);
      }
      if (!found) {
        saveOutSessions.push({
          sessionName: req.body.sessionName,
          individualSession: convertedParticipantList,
        });
      }
    });
    // update the value and save out. NOTE THAT THE MONGOOSE UPDATE FUNCTION DOES NOT WORK HERE!!
    console.log(saveOutSessions);
    existingUserSaves.savedSessions = saveOutSessions;
    let elm = await existingUserSaves.save();
    if (!elm) {
      res.status(500);
      res.send();
      return;
    }
  }

  res.status(200);
  res.send();
});

//UPDATING ONE

router.patch("/", async (req, res) => {});

//DELETING ONE

router.delete("/", async (req, res) => {
  console.log("deleting all");
  let success = await SavedSessions.collection.deleteMany({});
  console.log(success);
});

module.exports = router;
