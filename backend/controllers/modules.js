const { SUCCESS, SUCCESS_NO_CONTENT } = require("../common/statusCodes");
const asyncHandler = require("../utils/async");

const {
    createModuleService,
    getAllModulesService,
    getModuleService,
    getMetaModuleService,
    getModuleVersionService,
    getModuleUVersionService,
    editModuleService,
    updateModuleService,
    getUpdatedModulesService,
    getUpdatedModuleService,
    editUpdatedModuleService,
    getAllStatusService,
    updateCStatusService,
    updateUStatusService,
    deleteModuleService
} = require("../services/modules");

exports.createModuleController = asyncHandler(async (req, res) => {
    const result = await createModuleService(req.body);
    res.status(SUCCESS).json({ module: result });
});

exports.getAllModulesController = asyncHandler(async (req, res) => {
    const result = await getAllModulesService();
    res.status(SUCCESS).json(result);
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

exports.getAllStatusController = asyncHandler(async (req, res) => {
    const result = await getAllStatusService();
    res.status(SUCCESS).json(result);
})

exports.getModuleVersionController = asyncHandler(async (req, res) => {
    const result = await getModuleVersionService(req.query);
    res.status(SUCCESS).json(result);
});

exports.getModuleUVersionController = asyncHandler(async (req, res) => {
    const result = await getModuleUVersionService(req.query);
    res.status(SUCCESS).json(result);
});

exports.updateModuleController = asyncHandler(async (req, res) => {
    const result = await updateModuleService(req.body);
    res.status(SUCCESS).json(result);
});

exports.getUpdatedModulesController = asyncHandler(async (req, res) => {
    const result = await getUpdatedModulesService(req.query.username);
    res.status(SUCCESS).json(result);
});

exports.getUpdatedModuleController = asyncHandler(async (req, res) => {
    const result = await getUpdatedModuleService(req.query.document_id);
    res.status(SUCCESS).json(result);
});

exports.editUpdatedModuleController = asyncHandler(async (req, res) => {
    const result = await editUpdatedModuleService(req.body);
    res.status(SUCCESS).json(result);
});

exports.updateCStatusController = asyncHandler(async (req, res) => {
    const result = await updateCStatusService(req.body);
    res.status(SUCCESS).json(result);
});

exports.updateUStatusController = asyncHandler(async (req, res) => {
    const result = await updateUStatusService(req.body);
    res.status(SUCCESS).json(result);
})

exports.deleteModuleController = asyncHandler(async (req, res) => {
    const result = await deleteModuleService(req.body.username, req.body.document_id, req.body.rev);
    res.status(SUCCESS).json(result);
});