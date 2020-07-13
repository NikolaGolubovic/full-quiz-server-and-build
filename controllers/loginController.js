const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("hello world...");
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("Please put valid credentials!");
    }
    const user = await User.findOne({ username });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password);

    console.log(passwordCorrect);

    if (!user || !passwordCorrect) {
      throw new Error(
        "Password or user missing, please try to log in or if you don't have account to register"
      );
    }

    const userForToken = {
      username,
      id: user.id,
    };
    const token = jwt.sign(userForToken, process.env.SECRET);
    res.status(200).send({ token, username: user.username });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
