const asyncHandler = require("../utils/async");
const { comparePassword } = require("../utils/encryption");

const fs = require("fs");
const {
    getWithUsernameService,
    createUserService
} = require("../services/auth");

const { strategy } = require("./saml");

const { NOT_AUTHORIZED, SUCCESS } = require("../common/statusCodes");
const jwt = require("jsonwebtoken");
const { cookie } = require("express-validator");
const { rdsClient } = require("../utils/rds");


exports.loginAuthController = asyncHandler(async (req, res) => {
    let result = await getWithUsernameService(req.body.username);
    if (result === undefined) {
        res.status(NOT_AUTHORIZED).json("User is not available");
    } else {
        if (await comparePassword(req.body.password, result.password)) {
            const user = { username: req.body.username };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1w' });
            res.setHeader('Access-Control-Allow-Credentials', true);
            res.setHeader('Access-Control-Expose-Headers', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: 'None' });
            res.cookie("administration", result.administration, { httpOnly: true, secure: true, sameSite: 'None' });
            res.sendStatus(SUCCESS);
        }
        else {
            res.status(NOT_AUTHORIZED).json("Password is wrong");
        }
    }

});

exports.tokenAuthController = asyncHandler(async (req, res) => {
    const refreshToken = await rdsClient.get(req.body.username);
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = jwt.sign({ name: user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1w' });
        res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: 'None' });
        res.sendStatus(SUCCESS);
    });
});


exports.createUserController = asyncHandler(async (req, res) => {
    const user = { username: req.body.username };
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    await rdsClient.set(req.body.username, refreshToken);
    const result = await createUserService(req.body);
    res.status(SUCCESS).json(result);
});

exports.logoutAuthController = asyncHandler(async (req, res) => {
    res.cookie("accessToken", null, { httpOnly: true, secure: true, sameSite: 'None' });
    res.cookie("role", null, { httpOnly: true, secure: true, sameSite: 'None' });
    res.sendStatus(SUCCESS);
});

exports.getUserRoleController = asyncHandler(async (req, res) => {
    if (req.cookies["administration"]) {
        res.status(SUCCESS).json(true)
    }
    else {
        res.status(SUCCESS).json(false);
    }
});

exports.getMetadataController = asyncHandler(async (req, res) => {
    const publicCert = fs.readFileSync(process.env.SAMLCERT, 'utf-8');
    let metadata = strategy.generateServiceProviderMetadata(publicCert, publicCert);
    res.contentType("application/xml");
    res.send(metadata);
});

