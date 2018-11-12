
const express = require('express');
const fs = require('fs');
const socket = require('socket.io');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

const io = socket(server);

//update json file
app.put('/api/JSON', (request, response) => {

    var bodyString = JSON.stringify(request.body);

    fs.writeFile('projectData.txt', bodyString , (err) => {
        if(err)return response.status(400).send("Unable to write received data");
    });

    response.send(request.body);

    //TODO: update clients
    io.sockets.emit('update', bodyString);

});

//get value with given key
app.get('/api/JSON/', (request, response) => {

    var key = request.headers.key;

    fs.readFile('projectData.txt', 'utf8', (err, data) => {
        if(err)return response.status(400).send("Unable to read from file");

        var parsedData = JSON.parse(data);

        if(parsedData[key])response.send(parsedData[key]);
        else return response.status(400).send(`Unable to find entry with key ${key}`);

    });

});

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('update', (data) =>{
        console.log('updated');
    });

})
