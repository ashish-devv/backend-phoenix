require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const { member, mentor, project } = require("./models/model");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect(
  process.env.DBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connected to db Succesfully ✅");
    }
  }
);

app.route("/").get((req, res) => {
  res.render("index");
});

app.route("/signin").get((req, res) => {
  res.render("signin");
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

app.get("/aboutus",(req,res)=>{
  res.json({
    "aboutus":"This phonixe backend"
  })
})

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`server started at : ${port}`);
});
