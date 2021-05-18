const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//HTML routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

//Data Route
app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', (error, data) => {
        res.json(JSON.parse(data))
       
    } )
})

app.post("/api/notes", (req, res) => {
    console.log(req.body)
    
    
    fs.readFile(path.join(__dirname, "/db/db.json"), 'utf8', (error, data) => {
        const notes = JSON.parse(data) 
        notes.push(req.body)

    fs.writeFile(path.join(__dirname, "/db/db.json"), JSON.stringify(notes), error => {
        console.log('success')
        res.json(notes)
    }) 
    } )
    
})

app.listen(PORT, () => console.log(`listening to ${PORT}`))