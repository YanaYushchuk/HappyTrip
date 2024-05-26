const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_id: {type: String, required: true},
  firstname: { type: String, required: false, maxLength: 100 },
  lastname: { type: String, required: false, maxLength: 100 }
});

// Virtual for author's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);