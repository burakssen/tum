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
        case endpoints.delete: {
            return [];
        }
        case endpoints.getAllModules: {
            return [];
        }
        case endpoints.getMeta: {
            return [];
        }
        case endpoints.getAllStatus: {
            return [];
        }
        case endpoints.getModuleVersion: {
            return [];
        }
        case endpoints.getModuleUVersion: {
            return [];
        }
        case endpoints.getUpdatedModules: {
            return [];
        }
        case endpoints.getUpdatedModule: {
            return [];
        }
        case endpoints.editUpdatedModule: {
            return [];
        }
        case endpoints.updateCStatus: {
            return [];
        }
        case endpoints.updateUStatus: {
            return [];
        }
        default:
            break;
    }
}