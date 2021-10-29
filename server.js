const express = require("express");
const path = require("path");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));

});

app.post("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/db/db.json", 'utf8', (error, notes) => {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    let id = notes[notes.length - 1].id + 1
    let newNote = { title: req.body.title, text: req.body.text, id: id }
    let activeNote = notes.concat(newNote)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), (error, data) => {
      if (error) {
        return error
      }
      console.log(activeNote)
      res.json(activeNote);
    })
  })
})


app.get("/api/notes", (req, res) => {
  fs.readFile(__dirname + "/db/db.json", 'utf8', (error, data) => {
    if (error) {
      return console.log(error)
    }
    console.log("This is Notes", data)
    res.json(JSON.parse(data))
  })
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "/db/db.json", 'utf8', (error, notes) => {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), (error, data) => {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
})

app.put("/api/notes/:id", (req, res) => {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "db/db.json", "utf8", (error, notes) => {
    if (error ){
      return console.log(error)
    }
    notes.JSONparse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname +"db/db.json", JSON.stringify(notes), (error, data) => {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
})

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});