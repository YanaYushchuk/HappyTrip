const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  title: { type: String, required: true, maxLength: 1000 },
  description: { type: String, required: true, maxLength: 8000 },
  address: {type: String, required: false},
  image: { type: String, required: true}
});

// Virtual for author's URL
DestinationSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/destination/${this._id}`;
});

// Export model
module.exports = mongoose.model("Destination", DestinationSchema);