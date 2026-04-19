
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");


let db;
const PASSWORD = process.env.PASSWORD;
const USER = process.env.USER;
const DATABASE_PORT = process.env.DATABASE_PORT;

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: `postgresql://postgres_news_db_user:14vFZYHBnS0FT8ph1HHCtS6eAIlUg24q@dpg-cnjk5o6v3ddc738dcmcg-a.oregon-postgres.render.com/postgres_news_db`,
  
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  db = new Client({
    connectionString: `postgresql://${USER}:${PASSWORD}@127.0.0.1:${DATABASE_PORT}/news`,
  });
}

// Connect before running queries (see server.js).
// Do not call .connect() here: server awaits connect then listens.

module.exports = db;
