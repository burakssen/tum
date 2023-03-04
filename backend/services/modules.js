const asyncHandler = require("../utils/async");

const {
    createModuleData,
    getModuleData,
    getMetaModuleData,
    getModuleVersionData
} = require("../data/modules");

exports.createModuleService = asyncHandler(async (module) => {
    return await createModuleData(module);
});

exports.getModuleService = asyncHandler(async (username) => {
    return await getModuleData(username);
});

exports.getMetaModuleService = asyncHandler(async () => {
    return await getMetaModuleData();
});

exports.getModuleVersionService = asyncHandler(async (query) => {
    return await getModuleVersionData(query);
})