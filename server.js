/*

App server file

*/

const express = require('express');
const router = require('./server/routes/route');
const routerWeather = require('./server/routes/routesWeather');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');

const port = process.env.PORT || 3000

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/',router);
app.use('/weather',routerWeather);

app.listen(port,()=>{
    console.log("Weather App server is running!");
});
