const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path')
const app = express();

const fs = require('fs');
var data = fs.readFileSync('./database/db.json');
const saveddata = require('./database/db.json')
var myObject = JSON.parse(data);

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/notes", function (req, res) {

    res.sendFile(path.join(__dirname, "./public/notes.html"));
});



app.get('/api/note', (req, res) => {
    console.log('get recived')
    res.send(saveddata)
})



app.post('/api/note', (req, res) => {
    console.log('recived', req.body)
    const { userBody, userHeader } = req.body;
    if (userHeader, userBody) {
        let newdata = {
            userHeader, userBody,
            id: Math.floor(Math.random() * 100)
        };
        myObject.push(newdata);
        console.log('object', myObject);
        var newData = JSON.stringify(myObject);
        fs.writeFile('./database/db.json', newData, err => {
            // error checking
            if (err) throw err;

            console.log("New data added");
        });
        res.json(newdata)

    }

});
app.delete('/api/note/:ip', (req, res) => {
    console.log('recived delete')
    const ip = req.params.ip;
    fs.readFile('./database/db.json', 'utf8', function (err, data) {
        const myarr = JSON.parse(data);
       const  noteDB = myarr.filter(note => note.id != ip);
console.log(noteDB)
fs.writeFile("./database/db.json", JSON.stringify(noteDB), err => {
    if (err) throw err;
    res.json(noteDB);
    console.log("note deleted")
  });

    


    });
})

// default route is home
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));

})





app.listen(PORT, () => {
    console.log('LIistening in 3001 port');
})



