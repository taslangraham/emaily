const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  googleId: String,
  credits: { type: Number, default: 0 }
});

mongoose.model("users", userSchema);
