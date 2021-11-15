const lodash = require("lodash");
class ApiHelper {
  errorObject(error, message) {
    const ERROR_OBJ = {
      statusMessage: "ERROR",
      status: 400,
      message: message,
      reason: error,
    };

    return ERROR_OBJ;
  }

  successObject(data, message) {
    const SUCCESS_OBJ = {
      statusMessage: "SUCCESS",
      status: 200,
      message: message,
      data: data,
    };

    return SUCCESS_OBJ;
  }

  objectOmit(object, keys) {
    const objectString = JSON.stringify(object);
    const formattedObject = lodash.omit(JSON.parse(objectString), keys);
    return formattedObject;
  }
}

module.exports = ApiHelper;
