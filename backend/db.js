// "use strict";

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");


let db;
const password = process.env.PASSWORD;
const USER = process.env.USER;
const DATABASE_PORT = process.env.DATABASE_PORT;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: `postgresql://${USER}:${password}@127.0.0.1:${DATABASE_PORT}/news`,
  
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: `postgresql://${USER}:${password}@127.0.0.1:${DATABASE_PORT}/news`
  });
}


// db.connect();

module.exports = db;