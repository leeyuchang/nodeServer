const mongoose = require("mongoose");
const schemaOptions = require("./schemaOptions.js");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    password: {
      type: String,
      required: true,
    },
    nickname: String,
    insertedDate: {
      type: Date,
      default: Date.now,
    },
  },
  schemaOptions,
);

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;