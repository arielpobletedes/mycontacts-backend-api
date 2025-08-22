const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode
    ? res.statusCode
    : constants.INTERNAL_SERVER_ERROR;

  switch (statusCode) {
    case constants.BAD_REQUEST:
      res.json({
        title: constants.GENERIC_ERROR,
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.UNAUTHORIZED:
      res.json({
        title: constants.UNAUTHORIZED_ACCESS,
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.NOT_FOUND:
      res.json({
        title: constants.CONTACTS_NOT_FOUND,
        message: err.message,
        stack: err.stack,
      });
      break;
    case constants.INTERNAL_SERVER_ERROR:
      res.json({
        title: constants.INTERNAL_SERVER_ERROR_MSG,
        message: err.message,
        stack: err.stack,
      });
      break;
    default:
      res.json({
        title: constants.INTERNAL_ERROR,
        message: err.message,
        stack: err.stack,
      });
      break;
  }
};

module.exports = errorHandler;
