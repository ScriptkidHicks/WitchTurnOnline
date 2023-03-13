const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_CONNECT, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.on("open", () => {
  console.log("I have made a connection to the database");
});

app.use(express.json());
app.use(
  cors({
    /* Allowing all origins because chrome is bad about this */
    origin: "http://localhost:3000",
  })
);

const subscribersRouter = require("./routes/subscribers");

app.use("/subscribers", subscribersRouter);

app.listen(process.env.PORT, () => {
  console.log("The server has started");
  console.log(process.env.PORT);
});
