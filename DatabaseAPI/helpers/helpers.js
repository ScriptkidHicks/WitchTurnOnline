jwt = require("jsonwebtoken");
const Subscriber = require("../models/subscriber");
const asyncHandler = require("express-async-handler");

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

const protect = asyncHandler(async (req, res, next) => {
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
      req.subscriber = await Subscriber.findById(decoded.id).select(
        -hashedPassword
      );
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("not authorized");
    }
  } else {
    res.status(401);
    throw new Error("not authorized");
  }

  next();
});

module.exports = { generateToken, protect, verifyToken };
