const mongoose = require("mongoose");

const workshopParticipant = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  workshop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workshop",
    required: true,
  },
});

module.exports = mongoose.model("WorkshopParticipant", workshopParticipant);
