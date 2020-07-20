const express = require("express");

const Post = require("../models/post");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
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
    data: post.id,
  });
});

router.get("", (req, res, next) => {
  Post.find(req.query).then((documents) => {
    res.status(200).json({
      message: "Posts fetched.",
      data: documents,
    });
  });
});

router.get("/:id", (req, res, next) => {
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

router.put("/:id", checkAuth, (req, res, next) => {
  Post.findById(req.params.id)
    .then((document) => {
      if (document) {
        document.title = req.body.title;
        document.summary = req.body.summary;
        document.slug = req.body.slug;
        document.content = req.body.content;
        return document.save();
      } else {
        res.status(404).json({ message: "Post not found." });
      }
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Post update successfuly.",
        data: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({ message: "Post " + req.params.id + " deleted." });
  });
});

module.exports = router;
