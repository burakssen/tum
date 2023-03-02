const dotenv = require('dotenv');
const { BAD_REQUEST } = require("../common/statusCodes");
dotenv.config();

/**
 * @todo Other error codes should be handled.
 */
//Main error handler function
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    let error_messages = []
    if (error.errors) {
        error.errors.forEach(error => {
            error_messages.push(error.message)
        });
    }

    if (error.parent && error.parent.detail) {
        error_messages.push(error.parent.detail);
    }

    res.status(error.statusCode || BAD_REQUEST).json({
        code: process.env.SERVER_ERROR || 500,
        error: error_messages.length ? error_messages : ['Server Error']
    });
    next();
};

module.exports = errorHandler;