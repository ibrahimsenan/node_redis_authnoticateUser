const express = require("express");
var Logger = require("morgan");
const server = express();
var bodyParser = require("body-parser");

server.get("/", function (req, res) {
  res.send("<br/><h1>User Auth Service Started!</h1> \n <br />");
});

server.use(bodyParser.json());
server.use(Logger("dev"));

module.exports = server;
