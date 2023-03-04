const express = require("express");

const { endpoints } = require("../common/endpoints/modules");

const {
    createModuleController,
    updateModuleController,
    getModuleController,
    getMetaModuleController,
    getModuleVersionController
} = require("../controllers/modules");
const { authenticateToken } = require("../utils/authenticateToken");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/modules");

const router = express.Router();

router.post(
    endpoints.create,
    validationHandler,
    requestValidator(endpoints.create),
    authenticateToken,
    createModuleController
)

router.get(
    endpoints.get,
    validationHandler,
    requestValidator(endpoints.get),
    authenticateToken,
    getModuleController
);

router.get(
    endpoints.getMeta,
    validationHandler,
    requestValidator(endpoints.getMeta),
    authenticateToken,
    getMetaModuleController
)

router.get(
    endpoints.getModuleVersion,
    validationHandler,
    requestValidator(endpoints.getModuleVersion),
    authenticateToken,
    getModuleVersionController
)

module.exports = router;