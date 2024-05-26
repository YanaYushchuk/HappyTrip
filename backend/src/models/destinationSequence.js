const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DestinationSequenceSchema = new Schema({
  position: { type: Number, required: true },
  destination: { type: Schema.Types.ObjectId, ref: "Destination", required: true }
});

// Export model
module.exports = mongoose.model("DestinationSequence", DestinationSequenceSchema);