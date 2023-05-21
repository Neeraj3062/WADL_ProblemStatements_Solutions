require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Student = require("./models");

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Db Connected and Listening on PORT:", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/addmarks", (req, res) => {
  var myData = new Student(req.body);
  myData
    .save()
    .then((item) => {
      console.log("Item saved to database");
      res.redirect("/getMarks");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

app.get("/getMarks", (req, res) => {
  Student.find(req.query)
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/dsbdaGreaterThan90", (req, res) => {
  Student.find({ dsbda_marks: { $gt: 90 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
});

app.get("/allGreaterThan80", (req, res) => {
  Student.find({
    dsbda_marks: { $gt: 90 },
    cc_marks: { $gt: 80 },
    ai_marks: { $gt: 90 },
    cns_marks: { $gt: 90 },
    wad_marks: { $gt: 90 },
  })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
});

app.get("/wadccLessThan60", (req, res) => {
  Student.find({
    cc_marks: { $lt: 60 },
    wad_marks: { $lt: 60 },
  })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
});

app.post("/delete/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((student) => {
      console.log("Deleted Successfully");
      res.redirect("/getMarks");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error occurred while deleting student");
    });
});
app.get("/update-user/:id", (req, res) => {
  const studentId = req.params.id;

  Student.findById(studentId)
    .then((student) => {
      if (student) {
        res.render("update_form", { student });
      } else {
        res.status(404).send("Student not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error occurred while fetching student data");
    });
});

app.post("/update-user/:id", (req, res) => {
  const studentId = req.params.id;
  const updatedStudent = {
    name: req.body.name,
    rollno: req.body.rollno,
    wad_marks: req.body.wad_marks,
    dsbda_marks: req.body.dsbda_marks,
    cns_marks: req.body.cns_marks,
    cc_marks: req.body.cc_marks,
    ai_marks: req.body.ai_marks,
  };

  Student.findByIdAndUpdate(studentId, updatedStudent)
    .then(() => {
      res.redirect("/getMarks");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error occurred while updating student marks");
    });
});

app.get("/findStudent/:query", (req, res) => {
  const query = req.params.query;
  Student.find({
    name: query,
  })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
});

app.get("/findStudent/:query/:query2", (req, res) => {
  const query = req.params.query;
  const query2 = req.params.query2;
  Student.find({ name: query, rollno: query2 })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
});
