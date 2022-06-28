const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ticketSchema = new Schema(
  {
    ticketname: {
      type: String,
      required: true,
    },
    customerID: {
      type: ObjectId,
      required: true,
    },
    status: {
      type: String,
      default: [],
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("Ticket", ticketSchema);
