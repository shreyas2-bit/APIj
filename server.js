const express = require('express');
const Datastore = require('nedb');

const app = express();

app.listen(3000, ()=> console.log('listening at 3000'));

app.use(express.static('public'));

app.use(express.json({limit:'1mb'}));  //for server to recieve data


const database = new Datastore('database.db');  
database.loadDatabase();

app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log(database);
    response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.long,
        timestamp: timestamp
    });  //function that sends data
});
