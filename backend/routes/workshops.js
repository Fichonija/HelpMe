const express = require("express");

const Workshop = require("../models/workshop");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
  const workshop = new Workshop({
    title: req.body.title,
    summary: req.body.summary,
    address: req.body.address,
    dateTime: new Date(req.body.dateTime),
    availablePlaces: req.body.availablePlaces,
    slug: req.body.slug,
  });
  workshop.save();

  console.log(workshop);
  res.status(201).json({
    message: "Workshop added successfuly.",
    data: workshop.id,
  });
});

router.get("", (req, res, next) => {
  Workshop.find(req.query)
    .populate("participants")
    .then((documents) => {
      res.status(200).json({
        message: "Workshops fetched.",
        data: documents,
      });
    });
});

router.get("/:id", (req, res, next) => {
  Workshop.find({ _id: req.params.id }).then((document) => {
    if (document) {
      res.status(200).json({
        message: "Workshop fetched.",
        data: document,
      });
    } else {
      res.status(404).json({
        message: "Workshop not found.",
      });
    }
  });
});

router.put("/:id", checkAuth, (req, res, next) => {
  Workshop.findById(req.params.id)
    .then((document) => {
      if (document) {
        document.title = req.body.title;
        document.summary = req.body.summary;
        document.address = req.body.address;
        document.dateTime = new Date(req.body.dateTime);
        document.availablePlaces = req.body.availablePlaces;
        document.slug = req.body.slug;
        return document.save();
      } else {
        res.status(404).json({
          message: "Workshop not found.",
        });
      }
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Workshop " + req.params.id + " successfuly updated.",
        data: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Workshop.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res
      .status(200)
      .json({ message: "Workshop " + req.params.id + " deleted." });
  });
});

module.exports = router;
