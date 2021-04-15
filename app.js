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

const mentorSchema = mongoose.Schema({
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

const projectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const member = mongoose.model("member", memberSchema);
const mentor = mongoose.model("mentor", mentorSchema);
const project = mongoose.model("project", projectSchema);

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

app
  .route("/mentors")
  .get((req, res) => {
    mentor.find((err, men) => {
      if (!err) {
        res.json(men);
      } else {
        res.json({ error: err });
      }
    });
  })
  .post((req, res) => {
    if (
      !(
        req.body.name == null ||
        req.body.phone == null ||
        req.body.email == null
      )
    ) {
      const ment = new mentor({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
      });
      ment.save((err, resu) => {
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

app
  .route("/projects")
  .get((req, res) => {
    project.find((err, proj) => {
      if (!err) {
        res.json(proj);
      } else {
        res.json(err);
      }
    });
  })
  .post((req, res) => {
    if (!(req.body.name == null || req.body.description == null)) {
      const proj = new project({
        name: req.body.name,
        description: req.body.description,
      });
      proj.save((err, resp) => {
        if (!err) {
          res.json(resp);
        } else {
          res.json({ message: "Some Error Occured Please Try Again" });
        }
      });
    } else {
      res.json({ message: "Some Error Occured Please Try Again" });
    }
  });

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server started at : ${port}`);
});
