const asyncHandler = require("../utils/async");

const {
    createModuleData,
    getModuleData,
    getMetaModuleData,
    getModuleVersionData,
    editModuleData,
    updateModuleData
} = require("../data/modules");

exports.createModuleService = asyncHandler(async (module) => {
    return await createModuleData(module);
});

exports.editModuleService = asyncHandler(async (module) => {
    return await editModuleData(module);
});

exports.getModuleService = asyncHandler(async (username) => {
    return await getModuleData(username);
});

exports.getMetaModuleService = asyncHandler(async () => {
    return await getMetaModuleData();
});

exports.getModuleVersionService = asyncHandler(async (query) => {
    return await getModuleVersionData(query);
});

exports.updateModuleService = asyncHandler(async (module) => {
    return await updateModuleData(module)
});