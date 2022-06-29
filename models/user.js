const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password,10);
  // this. passwordmatch =await bcrypt.compare(this.passwordmatch,this.password);
  //  console.log(this.passwordmatch);
});
// userSchema.methods.comparePassword =async function(yourPasssword){
//   return await bcrypt.compare(yourPasssword,this.password);

// }
module.exports = mongoose.model("User", userSchema);
