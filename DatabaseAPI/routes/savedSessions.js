const express = require("express");
const { generateToken, verifyToken } = require("../helpers/helpers");
const router = express.Router();

const Participant = require("../models/participant");
const SavedIndividualSession = require("../models/savedIndividualSession");
const SavedSessions = require("../models/savedSessions");

const jwt = require("jsonwebtoken");

//GET ALL

router.get("/", async (req, res) => {});

//GET ONE

router.get("/:id", async (req, res) => {});

//GET ONE BY NAME

router.get("/:name", async (req, res) => {});

//CREATING ONE

router.post("/", async (req, res) => {});

//UPDATING ONE

router.patch("/", async (req, res) => {});

//DELETING ONE

router.delete("/", async (req, res) => {});
