const Redis = require("./redis");
require("bluebird").promisifyAll(Redis);

class RedisService {
  static async isTokenExists(token, response) {
    try {
      const redisRes = await Redis.getAsync(token);
      if (!redisRes) {
        errorResponse(response);
      }
      const redisDataJson = JSON.parse(redisRes);
      return redisDataJson;
    } catch (error) {
      throw error;
    }
  }

  static async getTokenData(token, response) {
    try {
      const validateToken = await Redis.getAsync(token);
      if (!validateToken) {
        errorResponse(response);
        return false;
      }
      const redisDataJson = JSON.parse(validateToken);
      return redisDataJson;
    } catch (error) {
      throw error;
    }
  }

  static async saveTokenData(accessToken, tokenData) {
    try {
      const tokenDataString = JSON.stringify(tokenData);
      const reds = await Redis.setAsync(accessToken, tokenDataString);
      await Redis.expireAsync(accessToken, 7500);
      if (reds) {
        return reds;
      }
    } catch (error) {
      throw error;
    }
  }

  static async removeToken(token, response) {
    try {
      const isToken = await Redis.getAsync(token);
      if (!isToken) {
        errorResponse(response);
        return false;
      }
      await Redis.delAsync(token);
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async keepAliveToken(token, response) {
    try {
      const extendToken = await Redis.expireAsync(token, 7500);
      if (extendToken !== 1) {
        errorResponse(response);
        return false;
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}

const errorResponse = (response) => {
  response.status(403).send({ Error: "Token not valid!", status: "Error" });
};

module.exports = RedisService;
