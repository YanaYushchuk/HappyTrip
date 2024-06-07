const mongoose = require("mongoose");
const destinationSequence = require("./destinationSequence");

const Schema = mongoose.Schema;

const TripSchema = new Schema({
  title: { type: String, required: true, maxLength: 1000 },
  description: { type: String, required: true, maxLength: 8000 },
  price: { type: Number, required: true },
  destinations: [{ type: Schema.Types.ObjectId, ref: "Destination"}],
  destinationSequences: [{ type: Schema.Types.ObjectId, ref: "DestinationSequence"}],
  startPlace: { type: String, required: false},
  startTime: [{ type: Date, required: true}],
  finishTime: [{ type: Date, required: true}],
  photos: [{ type: String, required: true}]
});

// Virtual for author's URL
TripSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/trip/${this._id}`;
});

// Export model
module.exports = mongoose.model("Trip", TripSchema);