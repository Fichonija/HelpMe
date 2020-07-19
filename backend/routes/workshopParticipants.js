const express = require("express");

const WorkshopParticipant = require("../models/workshopParticipant");
const Workshop = require("../models/workshop");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", (req, res, next) => {
  const workshopParticipant = new WorkshopParticipant({
    fullname: req.body.fullname,
    email: req.body.email,
    workshop: req.body.workshop,
  });

  workshopParticipant
    .save()
    .then((participant) => {
      const workshop = Workshop.findById(req.body.workshop).then((workshop) => {
        workshop.participants.push(workshopParticipant);
        return workshop.save();
      });
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Workshop participant added successfuly.",
        data: workshopParticipant.id,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
        data: null,
      });
    });
});

router.get("", (req, res, next) => {
  WorkshopParticipant.find(req.query)
    .populate("workshop")
    .then((documents) => {
      res.status(200).json({
        message: "Workshop participants fetched.",
        data: documents,
      });
    });
});

router.delete("/:id", (req, res, next) => {
  let participantId = req.params.id;
  let workshopId = null;

  WorkshopParticipant.findById(req.params.id)
    .then((participant) => {
      workshopId = participant.workshop._id;
      return participant.deleteOne();
    })
    .then((result) => {
      console.log(result);
      return Workshop.findById(workshopId);
    })
    .then((workshop) => {
      workshop.participants = workshop.participants.filter(
        (p) => p != participantId
      );
      return workshop.save();
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Workshop participant " + req.params.id + " deleted.",
      });
    });
});

module.exports = router;
