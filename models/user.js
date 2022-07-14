const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs"); encrypt &bcrypt did not use in models

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    emailid: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    avatar:
    {
        type: String,
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
