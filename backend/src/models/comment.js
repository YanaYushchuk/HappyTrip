const mongoose = require("mongoose");
const trip = require("./trip");
const user= require("./user");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  description: { type: String, required: true, maxLength: 8000 },
  users: { type: Schema.Types.ObjectId, ref: "User", required: true},
  trips: { type: Schema.Types.ObjectId, ref: "Trip", required: true},
  });

// Virtual for author's URL
CommentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);