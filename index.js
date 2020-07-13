require("dotenv").config();
const mongoose = require("mongoose");

try {
  mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    (err) => {
      if (err) console.log(err);
      console.log("✈️   ✈️  ...mongodb...");
    }
  );
} catch (err) {
  console.log("err", err);
}

require("./models/User");

const app = require("./app");

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log("✈ ✈  ..SERVER.. " + `Connected to http://localhost:${PORT}`);
});
