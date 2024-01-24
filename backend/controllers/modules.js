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
    deleteModuleService,
    addExistingModulesService,
    getExistingModulesService,
    deleteExistingModulesService
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
    const result = await deleteModuleService(req.body);
    res.status(SUCCESS).json(result);
});

exports.addExistingModulesController = asyncHandler(async (req, res) => {
    const result = await addExistingModulesService(req.body);

    if (result === undefined) {
        res.status(SUCCESS_NO_CONTENT).json({ message: "Module ID already exists" });
        return;
    }

    res.status(SUCCESS).json(result);
});

exports.getExistingModulesController = asyncHandler(async (req, res) => {
    const result = await getExistingModulesService();
    if (result === undefined) {
        res.status(SUCCESS_NO_CONTENT).json({ message: "No module found" });
        return;
    }
    res.status(SUCCESS).json(result);
});

exports.deleteExistingModulesController = asyncHandler(async (req, res) => {
    const result = await deleteExistingModulesService(req.body);
    if (result === undefined) {
        res.status(SUCCESS_NO_CONTENT).json({ message: "No module found" });
        return;
    }
    res.status(SUCCESS).json(result);
});