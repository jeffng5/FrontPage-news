
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
    connectionString: `postgresql://postgres_news_db_user:14vFZYHBnS0FT8ph1HHCtS6eAIlUg24q@dpg-cnjk5o6v3ddc738dcmcg-a.oregon-postgres.render.com/postgres_news_db`
  });
}


module.exports = db;