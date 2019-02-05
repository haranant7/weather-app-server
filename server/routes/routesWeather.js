const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuth = require('./jwtAuth');
const weather = require('../external/weather');
const APIModule = require('../external/api');
const captialsJson = require("../data/capitals.json");

router.use(function (req, res, next) {
    jwtAuth.checkToken(req, res, next);
    //next();
});

router.get('/get/capitals', (req, res) => {
        res.send( {'errorCode':0, 'data':captialsJson} );
});

router.get('/get/weather', (req, res) => {
        weather.getWeather(req,(error,body) => {
            res.send( body );
        })
});

router.post('/post/favourite', (req, res) => {
        console.log('postFavourite req body', req.body);
        APIModule.postFavourite(req,(error,body) => {
            res.send( body );
        })
});

router.get('/get/favourites', (req, res) => {
        APIModule.getFavourites(req,(error,body) => {
            console.log('getFavourites',body);
            res.send( body );
        })
});

module.exports = router;