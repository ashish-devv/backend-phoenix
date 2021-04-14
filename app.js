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
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const mentor = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const member = mongoose.model("member", memberSchema);

app.route("/").get((req, res) => {
  res.json({ message: "Welcome To Phoenix 👩‍💻" });
});

app
  .route("/members")
  .get((req, res) => {
    member.find((err, mem) => {
      if (!err) {
        res.json(mem);
      }
    });
  })
  .post((req, res) => {
    console.log(req.body);
    if (!(req.body.name == null || req.body.phone == null)) {
      const mem = new member({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      });
      mem.save((err, resu) => {
        if (!err) {
          res.json(resu);
        } else {
          res.json({ message: "Phone Or Email Already in use !" });
        }
      });
    } else {
      res.json({ message: "Some Error Occured Please Try Again" });
    }
  });

const port = process.port || 3000;

app.listen(port, () => {
  console.log(`server started at : ${port}`);
});
