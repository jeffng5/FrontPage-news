// "use strict";

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");


let db;
const password = process.env.PASSWORD;
const USER = process.env.USER;
const DATABASE_PORT = process.env.DATABASE_PORT;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
  
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: `postgresql://${USER}:${password}@localhost:${DATABASE_PORT}/news`
  });
}


db.connect();

module.exports = db;