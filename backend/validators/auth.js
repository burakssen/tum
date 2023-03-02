const { body } = require("express-validator");
const dotenv = require("dotenv");
const { endpoints } = require("../common/endpoints/auth");

dotenv.config();

exports.requestValidator = (method) => {
    switch (method) {
        case endpoints.login: {
            return [
                body("username")
                    .exists()
                    .withMessage("You have to provide a username")
            ];
        }
        case endpoints.logout: {
            return [];
        }
        case endpoints.token: { }
            return [];
        case endpoints.create: { }
            return [];
        default:
            break;
    }
}