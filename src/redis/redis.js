const redis = require("redis");
const timeOut = 1000 * 60 * 60;
const client = redis.createClient({
  host: "redis_server", //change to env
  port: 6379, // change to env

  no_ready_check: false,
  retry_strategy: (options) => {
    if (options.error && options.error.code === "ECONNREFUSED") {
      return new Error("The server refused the connection");
    }

    if (options.total_retry_time > timeOut) {
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 50) {
      return undefined;
    }

    let attemptValue = (options.attempt - 1) * 100;
    if (attemptValue < 0) {
      attemptValue = 0;
    }

    return Math.min(options.attempt * 100, 3000);
  },
});

module.exports = client;
