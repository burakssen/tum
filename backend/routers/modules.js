const express = require("express");

const { endpoints } = require("../common/endpoints/modules");

const {
    createModuleController,
    updateModuleController,
    getModuleController,
    getAllModulesController,
    getMetaModuleController,
    getAllStatusController,
    getModuleVersionController,
    editModuleController,
    getUpdatedModulesController,
    getUpdatedModuleController,
    editUpdatedModuleController
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
);

router.post(
    endpoints.edit,
    validationHandler,
    requestValidator(endpoints.edit),
    authenticateToken,
    editModuleController
);

router.get(
    endpoints.get,
    validationHandler,
    requestValidator(endpoints.get),
    authenticateToken,
    getModuleController
);

router.get(
    endpoints.getAllModules,
    validationHandler,
    requestValidator(endpoints.getAllModules),
    authenticateToken,
    getAllModulesController
)

router.get(
    endpoints.getMeta,
    validationHandler,
    requestValidator(endpoints.getMeta),
    authenticateToken,
    getMetaModuleController
);

router.get(
    endpoints.getAllStatus,
    validationHandler,
    requestValidator(endpoints.getAllStatus),
    authenticateToken,
    getAllStatusController
)

router.get(
    endpoints.getModuleVersion,
    validationHandler,
    requestValidator(endpoints.getModuleVersion),
    authenticateToken,
    getModuleVersionController
);

router.post(
    endpoints.update,
    validationHandler,
    requestValidator(endpoints.update),
    authenticateToken,
    updateModuleController
)

router.get(
    endpoints.getUpdatedModules,
    validationHandler,
    requestValidator(endpoints.getUpdatedModules),
    authenticateToken,
    getUpdatedModulesController
)

router.get(
    endpoints.getUpdatedModule,
    validationHandler,
    requestValidator(endpoints.getUpdatedModule),
    authenticateToken,
    getUpdatedModuleController
)

router.post(
    endpoints.editUpdatedModule,
    validationHandler,
    requestValidator(endpoints.editUpdatedModule),
    authenticateToken,
    editUpdatedModuleController
)

module.exports = router;