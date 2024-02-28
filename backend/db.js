// "use strict";

const { Client } = require("pg");
const { getDatabaseUri } = require("./config");


let db;
const password = +process.env.PASSWORD
const USER = process.env.USER
const PORT = process.env.PORT

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: getDatabaseUri(),
  
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: `postgresql://jeffreyng:beachbodyp90x@127.0.0.1:5433/news`
  });
}


db.connect();

module.exports = db;