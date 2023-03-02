const { validationResult } = require("express-validator");
const dotenv = require("dotenv");

dotenv.config();

//Function that handles request validation errors
exports.validationHandler = (req, res, next) => {
    let errors = validationResult(req).array();
    if (errors && errors.length > 0) {
        res.status(400).json({ errors: errors });
        return;
    }
    next();
};