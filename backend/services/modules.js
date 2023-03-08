const asyncHandler = require("../utils/async");

const {
    createModuleData,
    getAllModulesData,
    getModuleData,
    getMetaModuleData,
    getModuleVersionData,
    editModuleData,
    updateModuleData,
    getUpdatedModulesData,
    getUpdatedModuleData,
    editUpdatedModuleData,
    getAllStatusData
} = require("../data/modules");

exports.createModuleService = asyncHandler(async (module) => {
    return await createModuleData(module);
});

exports.getAllModulesService = asyncHandler(async () => {
    return await getAllModulesData();
})

exports.editModuleService = asyncHandler(async (module) => {
    return await editModuleData(module);
});

exports.getModuleService = asyncHandler(async (username) => {
    return await getModuleData(username);
});

exports.getMetaModuleService = asyncHandler(async () => {
    return await getMetaModuleData();
});

exports.getAllStatusService = asyncHandler(async () => {
    return await getAllStatusData();
});

exports.getModuleVersionService = asyncHandler(async (query) => {
    return await getModuleVersionData(query);
});

exports.updateModuleService = asyncHandler(async (module) => {
    return await updateModuleData(module)
});

exports.getUpdatedModulesService = asyncHandler(async (username) => {
    return await getUpdatedModulesData(username);
});

exports.getUpdatedModuleService = asyncHandler(async (document_id) => {
    return await getUpdatedModuleData(document_id);
});

exports.editUpdatedModuleService = asyncHandler(async (module) => {
    return await editUpdatedModuleData(module);
});