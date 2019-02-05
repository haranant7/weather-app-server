const users =  require('../db/users');
let jwt = require('jsonwebtoken');
require('dotenv').config();


var signUp = (reqBody,callback) => {
    users.addUser(reqBody.userId,reqBody.pwd,(err,res) =>{
        if(!err){
            console.log('signup res', res);
            callback(err,{'errorCode':0, 'statusMsg':'User Data saved'});
        }
        else{
            console.log('signup error', err);
            callback(err,{'errorCode':100, 'statusMsg':err.name});   
        }        
    });
}

var authenticate = (reqBody,callback) => {
    users.authenticate(reqBody.userId,reqBody.pwd,(err,res) =>{
        if(!err){
            if(res.rowCount==1){
                console.log('authenticate res', res);
                let token = jwt.sign(
                      {userId: reqBody.userId},
                      process.env.JWT_KEY
                );
                callback(err,{'errorCode':0, 'statusMsg':'Authentication success', 'token': token});
            }
            else {
                console.log('authenticate error', {err:'no rows returned'});
                callback({err:'no rows returned'},{'errorCode':100, 'statusMsg':'Authentication failed'}); 
            }
        }
        else{
            console.log('authenticate error', err);
            callback(err,{'errorCode':100, 'statusMsg':'Authentication failed'});   
        }        
    });
}

var postFavourite = (req,callback) => {
    users.postFavourite(req.decoded.userId,req.body.city,(err,res) =>{
        if(!err){
            console.log('postFavourite res', res);
            callback(err,{'errorCode':0, 'statusMsg':'Favourite City saved'});
        }
        else{
            console.log('postFavourite error', err);
            callback(err,{'errorCode':100, 'statusMsg':err.name});   
        }        
    });
}

var getFavourites = (req,callback) => {
    var userId = req.decoded.userId;
    var favouriteCityArr =[];
    users.getFavourites(userId,(err,res) =>{
        if(!err){
            res.rows.forEach((item) => {
                favouriteCityArr.push(item.city);
            });
            callback(err,{'errorCode':0, 'favouriteCityList':favouriteCityArr.sort()});
        }
        else{
            console.log('getFavourites error', err);
            callback(err,{'errorCode':100, 'statusMsg':err.name});   
        }         
    });
}

module.exports = {
    signUp : signUp,
    authenticate : authenticate,
    postFavourite : postFavourite,
    getFavourites : getFavourites
}