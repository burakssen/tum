const { body } = require("express-validator");
const dotenv = require("dotenv");
const { endpoints } = require("../common/endpoints/modules");

dotenv.config();

exports.requestValidator = (method) => {
    switch (method) {
        case endpoints.create: {
            return [];
        }
        case endpoints.update: {
            return [];
        }
        case endpoints.edit: {
            return [];
        }
        case endpoints.get: {
            return [];
        }
        case endpoints.getMeta: {
            return [];
        }
        case endpoints.getModuleVersion: {
            return [];
        }
        default:
            break;
    }
}