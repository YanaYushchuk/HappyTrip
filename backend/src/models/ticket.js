const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  trip: { type: Schema.Types.ObjectId, ref: "Trip", required: true },
  dateStart: { type: Date, required: true},
  dateFinish: { type: Date},
  //user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Virtual for author's URL
TicketSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/ticket/${this._id}`;
});

// Export model
module.exports = mongoose.model("Ticket", TicketSchema);