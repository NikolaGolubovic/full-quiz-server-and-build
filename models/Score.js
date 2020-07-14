const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  totalPoints: {
    type: Number,
    default: 0,
  },
  totalGames: {
    type: Number,
    default: 0,
  },
  maxPoints: {
    type: Number,
    default: 0,
  },
  lastScore: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

scoreSchema.set("toJSON", {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj.__v;
    delete returnedObj._id;
    delete returnedObj.user;
    delete returnedObj.id;
  },
});

module.exports = mongoose.model("Score", scoreSchema);
