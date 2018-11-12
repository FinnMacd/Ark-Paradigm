
const express = require('express');
const app = expresss();
const port = 3000;

app.use(express.json());

//update json file
app.put('/api/JSON', (request, response) => {
    
});

//get value with given key
app.get('/api/JSON/:id', (request, response) => {

});

app.listen(port, () => console.log(`Listening on port ${port}`));
