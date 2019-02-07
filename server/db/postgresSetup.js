/*
One time initial setup of DB

*/

const pg = require('pg');
require('dotenv').config();

const pool = new pg.Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: process.env.DB_PORT
});

pool.query("CREATE TABLE users(userId VARCHAR(40) PRIMARY KEY,password VARCHAR(40) NOT NULL)", (err, res) => {
    console.log("created user table");
    console.log(err, res);
});

pool.query("CREATE TABLE favourites(id SERIAL PRIMARY KEY, userId VARCHAR(40), city VARCHAR(40) NOT NULL)", (err, res) => {
    console.log("created favourites table");
    console.log(err, res);
    pool.end();
});

