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

app
  .route("/")
  .get((req, res) => {
    res.json({ message: "hello world" });
  })
  .post((req, res) => {
    res.json({ desc: "posted" });
  });

const port = process.port || 3000;

app.listen(port, () => {
  console.log(`server started at : ${port}`);
});
