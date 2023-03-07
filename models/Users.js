const mongoose = require("mongoose");
const { Schema } = mongoose;

const users = new Schema({
  user_name: {
    type: String,
    required: [true, "Name is required"],
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
  },
  password: { type: String, required: [true, "Password is required"] },
  
  date_created: { type: Date, immutable: true, default: () => Date.now() },
});
module.exports = mongoose.model("users", users);
