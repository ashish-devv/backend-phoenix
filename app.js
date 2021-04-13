const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://localhost:27017/phoenix",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connected to db Succesfully ✅");
    }
  }
);

const memberSchema = mongoose.Schema({
  name: String,
  phone: String,
});

const member = mongoose.model("member", memberSchema);

app.route("/").get((req, res) => {
  res.json({ message: "Welcome To Phoenix 👩‍💻" });
});

app.route("/members").get((req, res) => {
  member.find((err, mem) => {
    if (!err) {
      res.json(mem);
    }
  });
});

const port = process.port || 3000;

app.listen(port, () => {
  console.log(`server started at : ${port}`);
});
