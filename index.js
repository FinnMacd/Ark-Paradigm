
const express = require('express')
const fs = require('fs')
const socket = require('socket.io')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))

// start express server
const server = app.listen(port, () => console.log(`Listening on port ${port}`))

// initialize socket.io socket
const io = socket(server)

// update json file
app.put('/api/JSON', (request, response) => {
  // parse the JSON object recieved in the request to a string
  var bodyString = JSON.stringify(request.body)

  // attempt to write request body to projectData.txt, errors otherwise
  fs.writeFile('projectData.txt', bodyString, (err) => {
    if (err) return response.status(400).send('Unable to write received data')
  })

  // return request body to requester
  response.send(request.body)

  // emit an update event to all listening sockets
  io.sockets.emit('update', bodyString)
})

// get value with given key
app.get('/api/JSON/', (request, response) => {
  // tries to find a header parameter named 'key', errors otherwise
  var key = request.headers.key
  if (!key) return response.status(400).send('Must add header parameter \'key\'')

  // tries to read from the file with JSON data in it, errors if not found
  fs.readFile('projectData.txt', 'utf8', (err, data) => {
    if (err) return response.status(400).send('Unable to read from file')

    // converts string data to a json object
    var parsedData = JSON.parse(data)

    // if the correct key is found return to requeste, error otherwise
    if (parsedData[key])response.send(parsedData[key])
    else return response.status(400).send(`Unable to find entry with key ${key}`)
  })
})

// listens for clients trying to connect
io.on('connection', (socket) => {
  console.log('made socket connection', socket.id)

  socket.on('update', (data) => {
    console.log('updated', data)
  })
})
