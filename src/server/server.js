const PORT = 6700;
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
const SERVER_EX = require("./express");
SERVER_EX.use("/api/v1/", CREAT_ROUTE);

//-------------------------------------------
//          RUNNING SERVER
//------------------------------------------

SERVER_EX.listen(PORT, () => {
  console.log("Auth Service Started at:", `http://localhost:${PORT}`);
});
