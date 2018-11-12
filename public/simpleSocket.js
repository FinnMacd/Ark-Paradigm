
const socket = io.connect("http://localhost:3000");

const main = document.getElementById('main');

socket.on('update', (data) => {
    main.innerHTML = '<p>'+data+'</p>';
});
