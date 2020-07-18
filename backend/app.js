const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/posts");
const workshopRoutes = require("./routes/workshops");
const workshopParticipantRoutes = require("./routes/workshopParticipants");
const authRoutes = require("./routes/auth");

const app = express();

mongoose
  .connect(
    "mongodb+srv://fbolcic:C8aW72Pn8eyjFRjf@cluster0-eijik.mongodb.net/HelpMe?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Connection to MongoDB failed. Error: " + err);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/workshopParticipants", workshopParticipantRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
