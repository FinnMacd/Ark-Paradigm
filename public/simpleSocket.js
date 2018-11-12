
// connects to server, in this case on local host
const socket = io.connect('http://localhost:3000')

// gets main div in html page
const main = document.getElementById('main')

// on update sets main div to recieved data
socket.on('update', (data) => {
  main.innerHTML = '<p>' + data + '</p>'
})
