const { SUCCESS, SUCCESS_NO_CONTENT } = require("../common/statusCodes");
const asyncHandler = require("../utils/async");

const {
    createModuleService,
    getModuleService,
    getMetaModuleService,
    getModuleVersionService,
    editModuleService,
    updateModuleService
} = require("../services/modules");

exports.createModuleController = asyncHandler(async (req, res) => {
    const result = await createModuleService(req.body);
    res.status(SUCCESS).json({ module: result });
});

exports.editModuleController = asyncHandler(async (req, res) => {
    const result = await editModuleService(req.body);
    res.status(SUCCESS).json({ module: result });
});

exports.getModuleController = asyncHandler(async (req, res) => {
    const result = await getModuleService(req.query.username);
    res.status(SUCCESS).json(result);
});

exports.getMetaModuleController = asyncHandler(async (req, res) => {
    const result = await getMetaModuleService();
    res.status(SUCCESS).json(result);
});

exports.getModuleVersionController = asyncHandler(async (req, res) => {
    const result = await getModuleVersionService(req.query);
    res.status(SUCCESS).json(result);
});

exports.updateModuleController = asyncHandler(async (req, res) => {
    const result = await updateModuleService(req.body);
    res.status(SUCCESS).json(result);
});