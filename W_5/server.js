require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const Song = require("./models");

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


app.post("/addsongs", (req, res) => {
  var myData = new Song(req.body);
  myData
    .save()
    .then((item) => {
      console.log("Item saved to database");
      res.redirect("/getSongs");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});

app.get("/getSongs", (req, res) => {
  Song.find(req.query)
    .then((song) => {
      res.render("table", { song: song });
    })
    .catch((err) => {
      console.log(err);
    });
});


app.post("/delete/:id", (req, res) => {
  Song.findByIdAndDelete(req.params.id)
    .then((song) => {
      console.log("Deleted Successfully");
      res.redirect("/getSongs");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error occurred while deleting student");
    });
});
app.get("/update-user/:id", (req, res) => {
  const songId = req.params.id;

  Song.findById(songId)
    .then((song) => {
      if (student) {
        res.render("update_form", { song });
      } else {
        res.status(404).send("Song not found");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error occurred while fetching student data");
    });
});

app.post("/update-user/:id", (req, res) => {
  const songId = req.params.id;
  const updateSong = {
    name: req.body.name,
    film:req.body.film,
    md:req.body.film,
    singer:req.body.film

  };

  Song.findByIdAndUpdate(songId, updateSong)
    .then(() => {
      res.redirect("/getSongs");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error occurred while updating song details");
    });
});

app.get("/findSong/:query", (req, res) => {
  const query = req.params.query;
  Song.find({
    md: query,

  })
    .then((song) => {
      res.render("table", { song: song });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
});

app.get("/findSong/:query/:query2", (req, res) => {
  const query = req.params.query;
  const query2 = req.params.query2;
  Song.find({ md: query, singer: query2 })
    .then((song) => {
      res.render("table", { song: song });
    })
    .catch((err) => {
      res.json({ message: "Error" });
    });
});
