const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  address: { type: String, required: true },
  dateTime: { type: Date, required: true },
  slug: { type: String, required: true },
});

module.exports = mongoose.model("Workshop", workshopSchema);
