//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// connecting the database
mongoose.connect("mongodb://localhost:27017/noteDB", {useNewUrlParser: true});

// creating a schema and model
const noteSchema = {
  title: String,
  content: String
};

const Note = mongoose.model("Note", noteSchema);

//Requests Targetting all notes


app.route("/notes")

.get(function(req, res){
  console.log("yaya")
  // res.json({message:"yay"});
  Note.find(function(err, foundNotes){
    if (!err) {
      res.send(foundNotes);
    } else {
      res.send(err);
    }
  });
})

.post(function(req, res){
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });

  newNote.save(function(err){
    if (!err){
      res.send("Successfully added a new note.");
    } else {
      res.send(err);
    }
  });
})

.delete(function(req, res){

  Note.deleteMany(function(err){
    if (!err){
      res.send("Successfully deleted all notes.");
    } else {
      res.send(err);
    }
  });
});

//Requests Targetting A Specific Note

app.route("/notes/:noteTitle")

.get(function(req, res){

  Note.findOne({title: req.params.noteTitle}, function(err, foundNote){
    if (foundNote) {
      res.send(foundNote);
    } else {
      res.send("No notes matching that title was found.");
    }
  });
})

.put(function(req, res){
  Note.findOneAndUpdate(
    {title: req.params.noteTitle},
    {
      title: req.body.title,
      content: req.body.content
    },
    {overwrite: true},
    function(err){
      if(!err){
        res.send("Successfully updated the selected note.");
      }
      else{

        res.send(err)
      }
    }
  );
})

.patch(function(req, res){
  Note.updateOne(
    {title: req.params.noteTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully updated note.");
      } else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){

  Note.deleteOne(
    {title: req.params.noteTitle},
    function(err){
      if (!err){
        res.send("Successfully deleted the corresponding note.");
      } else {
        res.send(err);
      }
    }
  );
});

// listening  to the port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000");
});
