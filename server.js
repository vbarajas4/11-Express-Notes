//Dependencies Packages
const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App
const app = express();

// Sets port for listening and let heroku decide on port
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//files in a directory named public
app.use(express.static("public"));

//HTML routes

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));



//Data Routes
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', (error, data) => {
        res.json(JSON.parse(data))
       
    } )
})

app.post("/api/notes", (req, res) => {
    console.log(req.body)    
    
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', (error, data) => {
        const notes = JSON.parse(data) 
        const id = notes.length+1
        notes.push({...req.body, id})

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), error => {
        console.log('success')
        res.json(notes)
    }) 
    } )
    
})

app.get("/api/notes/:id", (req, res) => {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "/db/db.json"), "utf8", (err, data) => {
        res.json(id[parseInt(req.params.id)]);
    })
    for (let i = 0; i < id.length; i++) {
        const idNote = id[i];
        if (id === idNote.title) {
          return res.json(idNote);
        }
        id.push(idNote);
    }
});

// app.delete("/api/notes/:id", (req, res) => {
//     res.sendFile(path.join(__dirname, "/db/db.json"),
// })

app.listen(PORT, () => console.log(`listening to ${PORT}`))