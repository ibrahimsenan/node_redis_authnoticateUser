const express = require("express");
var Logger = require("morgan");
const server = express();
const PORT = 6700;
var bodyParser = require("body-parser");
require("../redis/redis");

//-------------------------------------------
//          MONGODB SERVER
//------------------------------------------

//-------------------------------------------
//          REAL-TIME IO SERVER
//------------------------------------------

//-------------------------------------------
//          SERVER APIS & ROUTES
//------------------------------------------

const CREAT_ROUTE = require("../routes/routes");

//-------------------------------------------
//          EXPRESS SERVER
//------------------------------------------

server.get("/", function (req, res) {
  res.send("<br/><h1>User Auth Service Started!</h1> \n <br />");
});

server.use(bodyParser.json());
server.use(Logger("dev"));
server.use("/api/v1/", CREAT_ROUTE);

server.listen(PORT, () => {
  console.log("Auth Service Started at:", "http://localhost:5000");
});
