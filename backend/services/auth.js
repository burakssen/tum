const asyncHandler = require("../utils/async");
const dotenv = require("dotenv");
dotenv.config();

const {
    getWithUsernameData,
    createUserData
} = require("../data/auth");

exports.getWithUsernameService = asyncHandler(async (body) => {
    return await getWithUsernameData(body.username);
});

exports.createUserService = asyncHandler(async (body) => {
    return await createUserData(body);
});