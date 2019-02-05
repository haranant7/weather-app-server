const express = require('express');
const router = express.Router();

const APIModule = require('../external/api');

router.post('/signUp', (req, res) => {
        console.log('signup req body', req.body);
        APIModule.signUp(req.body,(error,body) => {
            res.send( body );
        })
});

router.post('/authenticate', (req, res) => {
        console.log('authenticate req body', req.body);
        APIModule.authenticate(req.body,(error,body) => {
            res.send( body );
        })
});


module.exports = router;