"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(3001, function () {
  console.log(`Started on http://0.0.0.0:3001`);
});