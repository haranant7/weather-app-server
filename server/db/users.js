const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT
});


pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
});

var addUser = (userId,pwd,callback) => {
    console.log("Query Executed",`INSERT INTO users (userid, password ) VALUES ('${userId}','${pwd}'')`);
    pool.query(`INSERT INTO users (userid, password ) VALUES ('${userId}','${pwd}')`, (err, res) => {
        callback(err,res);
    });
}

var authenticate = (userId,pwd,callback) => {
    console.log("Query Executed",`SELECT * FROM users WHERE userid='${userId}' AND password='${pwd}'`);
    pool.query(`SELECT * FROM users WHERE userid='${userId}' AND password='${pwd}'`, (err, res) => {
        callback(err,res);
    });
}

var postFavourite = (userId,city,callback) => {
    console.log("Post favourite Query Executed",`SELECT * FROM users WHERE userid='${userId}'`);
    pool.query(`SELECT * FROM users WHERE userid='${userId}'`, (err, res) => {
        if(!err){
            if(res.rowCount==1){
                console.log("Query Executed",`INSERT INTO favourites (userid, city ) VALUES ('${userId}','${city}')`);
                pool.query(`INSERT INTO favourites (userid, city ) VALUES ('${userId}','${city}')`, (err, res) => {
                    callback(err,res);
                });
            }
            else{
                console.log('postFavourite error', {err:'Invalid user'});
                callback({err:'Invalid User',name:'User not found'});
            }            
        }
        else{
            callback(err,res);
        }
    });
}

var getFavourites = (userId,callback) => {
    console.log('getFavourites get User',`SELECT * FROM users WHERE userid='${userId}'`);
    pool.query(`SELECT * FROM users WHERE userid='${userId}'`, (err, res) => {
        if(!err){
            if(res.rowCount==1){
                console.log('getFavourites Query',`SELECT * FROM favourites WHERE userid='${userId}'`);
                pool.query(`SELECT * FROM favourites WHERE userid='${userId}'`, (err, res) => {
                    callback(err,res);
                });
            }
            else{
                console.log('getFavourites error', {err:'Invalid user'});
                callback({err:'Invalid User',name:'User not found'});
            }            
        }
        else{
            callback(err,res);
        }
    });
}

module.exports = {
    addUser : addUser,
    authenticate : authenticate,
    postFavourite : postFavourite,
    getFavourites : getFavourites
}