"use strict";

const app = require("./app");
const db = require("./db");
const { PORT } = require("./config");

// pg Client used by routes/users.js must be connected before handling requests
db.connect()
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Started on http://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("PostgreSQL connection failed:", err.message);
    process.exit(1);
  });
