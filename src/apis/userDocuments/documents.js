const express = require("express");
const router = express.Router();
const lodash = require("lodash");
const hat = require("hat");

const ApiHelper = require("../../utils/apiHelpers");
const redisService = require("../../redis/redisService");
const apiUtils = new ApiHelper();

const USER_DOCUMENTS = "/user/documents";
const USER_DOCUMENTS_ID = "/user/documents/:document_id";
// user can login

const dataDb = [
  {
    document: {
      id: 465,
      date: Date.now,
      status: "old",
    },
    id: 442,
    details: "text is a text",
  },
  {
    document: {
      id: 141,
      date: Date.now,
      status: "old",
    },
    id: 223,
    details: "text is a text",
  },
  {
    document: {
      id: 411,
      date: Date.now,
      status: "old",
    },
    id: 142,
    details: "text is a text",
  },
  {
    document: {
      id: 244,
      date: Date.now,
      status: "old",
    },
    id: 112,
    details: "text is a text",
  },
];

// validate token
router.post(USER_DOCUMENTS, async (request, response) => {
  const authToken = await redisService.getTokenData(
    request.headers.access_token,
    response
  );
  const newRequest = lodash.cloneDeep(request.body);
  newRequest.id = Math.floor(Math.random() * 10000);
  if (newRequest.document)
    newRequest.document.id = Math.floor(Math.random() * 10000);

  if (authToken && newRequest) {
    dataDb.push(newRequest);
    response
      .status(200)
      .send(
        apiUtils.successObject(newRequest, "Document Posted Successfully!")
      );
  }
});

// get all user document
router.get(USER_DOCUMENTS, async (request, response) => {
  const authToken = await redisService.isTokenExists(
    request.headers.access_token,
    response
  );

  authToken && response.status(200).send(apiUtils.successObject(dataDb, ""));
});

// get document per Id
router.get(USER_DOCUMENTS_ID, async (request, response) => {
  const authToken = await redisService.isTokenExists(
    request.headers.access_token,
    response
  );

  if (authToken && request.params) {
    const finDoc = dataDb.find((doc) => doc.id == request.params.document_id);
    if (!finDoc) apiUtils.errorResponse(response);
    apiUtils.successfulResponse(response, finDoc);
  } else {
    apiUtils.errorResponse(response);
  }
});

router.delete(USER_DOCUMENTS_ID, async (request, response) => {
  const authToken = await redisService.isTokenExists(
    request.headers.access_token,
    response
  );

  if (authToken && request.params) {
    const finDoc = lodash.remove(
      dataDb,
      (doc) => doc.id == request.params.document_id
    );
    if (!finDoc) apiUtils.errorResponse(response);
    apiUtils.successfulResponse(response, dataDb);
  } else {
    apiUtils.errorResponse(response);
  }
});

module.exports = router;
