const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Score = require("../models/Score");
const { auth } = require("../utils/middlewares");

router.post("/", async (req, res, next) => {
  try {
    const { username, password: pass } = req.body;

    const foundUser = await User.findOne({ username });

    if (foundUser !== null) {
      throw new Error("User with that name already exists");
    }

    const salt = 10;
    const password = await bcrypt.hash(pass, salt);

    const newUser = new User({
      username,
      password,
      date: new Date(),
    });

    const createdUser = await newUser.save();

    const scoreCard = new Score({
      user: createdUser.id,
    });

    await scoreCard.save();

    res.status(200).json({ info: "User is successfully register!" });
  } catch (err) {
    next(err);
  }
});

router.put("/score", auth, async (req, res, next) => {
  const { score } = req.body;
  const decoded = jwt.verify(req.token, process.env.SECRET);
  const foundUser = await User.findById(decoded.id);
  const foundScore = await Score.findOne({ user: decoded.id });

  const updatedInfos = {
    maxPoints: foundScore.maxPoints < score ? score : foundScore.maxPoints,
    totalGames: foundScore.totalGames + 1,
    totalPoints: foundScore.totalPoints + score,
  };
  const updateScore = await Score.findByIdAndUpdate(
    foundScore._id,
    updatedInfos,
    {
      new: true,
    }
  );
  res.status(200).json(updateScore);
});

router.post("/score", async (req, res, next) => {});

module.exports = router;
