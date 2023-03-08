const express = require("express");

const { endpoints } = require("../common/endpoints/auth");

const {
    loginAuthController,
    tokenAuthController,
    logoutAuthController,
    createUserController,
    getUserRoleController
} = require("../controllers/auth");
const { authenticateToken } = require("../utils/authenticateToken");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/auth");

const router = express.Router();

router.post(
    endpoints.login,
    validationHandler,
    requestValidator(endpoints.login),
    loginAuthController
);

router.post(
    endpoints.token,
    validationHandler,
    requestValidator(endpoints.token),
    tokenAuthController
);

router.post(
    endpoints.create,
    validationHandler,
    requestValidator(endpoints.create),
    createUserController
)

router.post(
    endpoints.logout,
    validationHandler,
    requestValidator(endpoints.logout),
    authenticateToken,
    logoutAuthController
)

router.get(
    endpoints.getUserRole,
    validationHandler,
    requestValidator(endpoints.getUserRole),
    authenticateToken,
    getUserRoleController
)

module.exports = router;