const express = require("express");
const router = express.Router();

const { verify } = require("../helpers/helpers");

module.exports = router;

router.get("/", async (req, res) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // retreive token
      token = req.headers.authorization.split(" ")[1];

      const decoded = verify(token);
    } catch (error) {}
  }
});
