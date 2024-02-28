"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;
const password = process.env.PASSWORD
const PORT = process.env.PORT
const USER = process.env.USER

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
  
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    // connectionString: getDatabaseUri()
    connectionString: `postgresql://${USER}:${password}@127.0.0.1:5433/${PORT}`
  });
}


db.connect();

module.exports = db;