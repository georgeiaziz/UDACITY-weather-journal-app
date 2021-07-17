// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
const server = app.listen(port, ()=>{console.log(`George project server is running`); console.log(`it is running on localhost: ${port}`);});

// GET route
app.get('/receiveData', sendData);

function sendData (request, response) {
  response.send(projectData);

};

// POST route

app.post('/sendData', callBack);

function callBack(req,res){

    projectData.City = req.body.City;
    projectData.Date = req.body.Date;
    projectData.Feel = req.body.Feel;
    projectData.Temp = req.body.Temp;
    
    res.send(JSON.stringify('Done'));

};
