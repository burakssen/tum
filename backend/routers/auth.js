const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { endpoints } = require("../common/endpoints/auth");
const { SUCCESS } = require("../common/statusCodes");

const axios = require("axios");
const {
    loginAuthController,
    tokenAuthController,
    logoutAuthController,
    createUserController,
    getUserRoleController,
    getMetadataController
} = require("../controllers/auth");
const { authenticateToken } = require("../utils/authenticateToken");

const { validationHandler } = require("../utils/validator");
const { requestValidator } = require("../validators/auth");

const { passport } = require("../controllers/saml");
const asyncHandler = require("../utils/async");
const e = require("express");

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
    (req, res) => {
        try {
            req.logout((err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.cookie("accessToken", null, { httpOnly: true, secure: true, sameSite: 'None' });
            res.cookie("user", null, { httpOnly: true, secure: true, sameSite: 'None' });
            res.sendStatus(SUCCESS);
        } catch (err) {
            console.log(err);
        }

    }
)

router.get(
    endpoints.getUserRole,
    validationHandler,
    requestValidator(endpoints.getUserRole),
    authenticateToken,
    getUserRoleController
)

router.get(
    endpoints.metadata,
    validationHandler,
    requestValidator(endpoints.metadata),
    getMetadataController
)

router.get(
    endpoints.csrf,
    (req, res) => {
        res.status(SUCCESS).send({ token: req.cookies["_csrf"] })
    }
)

router.get(
    "/isAuthenticated",
    (req, res) => {
        if (req.isAuthenticated()) {
            res.status(SUCCESS).json({
                user: req.cookies["user"],
            });
        }
        else {
            res.status(SUCCESS).json(false);
        }
    }
)

router.get(
    endpoints.access,
    passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
)

router.post(
    endpoints.authenticate,
    bodyParser.urlencoded({ extended: false }),
    passport.authenticate("saml", { failureRedirect: "/", failureFlash: true }),
    async (req, res) => {
        console.log(req.user);
        const user = { email: req.user.email };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1w' });
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: 'None' });
        res.cookie("user", req.user, { httpOnly: true, secure: true, sameSite: 'None' });
        res.redirect("/home");
    }
)


module.exports = router;