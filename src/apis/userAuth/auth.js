const express = require("express");
const router = express.Router();
const hat = require("hat");
const lodash = require("lodash");

//-------------------------------------------
//          API ROUTES
//------------------------------------------
const USER_CHANGE_PASSWORD = "/auth/change-password";
const VALIDATE_USER_TOKEN = "/auth/validate_token";
const USER_LOGIN = "/auth/user-login";
const USER_LOGOUT = "/auth/user-logout";
const EXTEND_TOKEN_TIME = "/auth/extend-token";
const GET_TOKEN_DETAILS = "/auth/get_token_details";
const FORGET_PASSWORD = "/forget-password";

//-------------------------------------------
//          LOCAL SERVICES
//------------------------------------------

const ApiHelper = require("../../utils/apiHelpers");
const redisService = require("../../redis/redisService");
const utils = new ApiHelper();

//-------------------------------------------
//          APIs HANDLERS
//------------------------------------------

// generate new token
router.post(USER_LOGIN, async (request, response) => {
  const token = hat();
  const authData = {
    email_address: request.body.email_address,
    user_password: request.body.password,
  };
  const redisSer = redisService.saveTokenData(token, authData);

  redisSer &&
    response
      .status(200)
      .send(utils.successObject({ access_token: token }, "user login success"));
});

// validate token
router.get(VALIDATE_USER_TOKEN, async (request, response) => {
  const authToken = await redisService.isTokenExists(
    request.headers.access_token,
    response
  );

  authToken &&
    response.status(200).send(utils.successObject(true, "Token is Valid!"));
});

// user logout and remove token
router.get(USER_LOGOUT, async (request, response) => {
  const authToken = await redisService.isTokenExists(
    request.headers.access_token,
    response
  );
  const rmAuthToken = await redisService.removeToken(
    request.headers.access_token,
    response
  );

  authToken &&
    rmAuthToken &&
    response.status(200).send(utils.successObject(true, "User Logged Out!"));
});

//extend token time
router.get(EXTEND_TOKEN_TIME, async (request, response) => {
  const authToken = await redisService.keepAliveToken(
    request.headers.access_token,
    response
  );

  authToken &&
    response
      .status(200)
      .send(utils.successObject(authToken, "Token Life Time Extended!"));
});

//get access token details
router.get(GET_TOKEN_DETAILS, async (request, response) => {
  const authToken = await redisService.getTokenData(
    request.headers.access_token,
    response
  );

  authToken &&
    response
      .status(200)
      .send(utils.successObject(authToken, "Token Details Revealed!"));
});

// User Change password

router.patch(USER_CHANGE_PASSWORD, async (request, response) => {
  //validate access_token
  const authToken = await redisService.getTokenData(
    request.headers.access_token,
    response
  );

  if (authToken) {
    // Validate user data
    // Your db user check here
    // Validate user passwords
    // Security check here

    //validate user repeated new passwords
    const comparNewPass = lodash.isEqual(
      request.body.new_password,
      request.body.repeated_new_password
    );
    if (!comparNewPass) response.status(400).send("New passwords not matched");

    //encrypt new password
    //user.password = await bcrypt.hash(request.body.new_password, 10);
    user.password = request.body.new_password;

    comparNewPass &&
      response
        .status(200)
        .send(
          utils.successObject(
            request.body.email_address,
            `user ${user.userName} is patched`
          )
        );
  }
});

// USER FORGET_PASSWORD

module.exports = router;
