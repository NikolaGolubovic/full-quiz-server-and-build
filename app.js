const express = require("express");
const cors = require("cors");

const userRouter = require("./controllers/userController");
const loginRouter = require("./controllers/loginController");

const { errorHandler } = require("./utils/middlewares");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

// stavi pre ruta ako treba za deploy

let protected = ["transformed.js", "main.css", "favicon.ico"];

app.get("*", (req, res) => {
  let path = req.params["0"].substring(1);

  if (protected.includes(path)) {
    // Return the actual file(s)
    res.sendFile(`${__dirname}/build/${path}`);
  } else {
    // Otherwise, redirect to /build/index.html
    res.sendFile(`${__dirname}/build/index.html`);
  }
});

app.use(errorHandler);

module.exports = app;
