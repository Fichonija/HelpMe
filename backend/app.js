const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");

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
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    summary: req.body.summary,
    slug: req.body.slug,
    content: req.body.content,
  });
  post.save();

  console.log(post);
  res.status(201).json({
    message: "Post added successfuly.",
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find(req.query).then((documents) => {
    res.status(200).json({
      message: "Posts fetched.",
      data: documents,
    });
  });
});

app.get("/api/posts/:id", (req, res, next) => {
  Post.find({ _id: req.params.id }).then((document) => {
    if (document) {
      res.status(200).json({
        message: "Post fetched.",
        data: document,
      });
    } else {
      res.status(404).json({
        message: "Post not found.",
      });
    }
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post " + req.params.id + " deleted." });
  });
});

module.exports = app;
