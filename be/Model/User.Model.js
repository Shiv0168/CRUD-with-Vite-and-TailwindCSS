const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username required !!! "],
      unique: [true, "already registered !!!"],
    },
    email: {
      type: String,
      required: [true, "Email required !!! "],
      unique: [true, "already registered !!!"],
    },
    password: {
      type: String,
      required: [true, "Password required !!! "],
      unique: [true, "already registered !!!"],
    },
  },
  { timestamps: true }
);

exports.User = mongoose.model("User", userSchema);
