const { nano } = require("../database/couchdb");
const db_created_modules = nano.use("module_app_created_modules");
const db_updated_modules = nano.use("module_app_updated_modules");

exports.createModuleData = async (module) => {

    const metaDoc = await db_created_modules.get("meta");
    const newModule = await db_created_modules.insert({
        "versions": {
            [module.version]: {
                "module_id": module.module_id,
                "antragsteller": module.antragsteller,
                "modulverantwortlicher": module.modulverantwortlicher,
                "semester_start": module.semester_start,
                "titel_de": module.titel_de,
                "titel_en": module.titel_en,
                "dozenten": module.dozenten,
                "sws_v": module.sws_v,
                "sws_u": module.sws_u,
                "sws_p": module.sws_p,
                "stunden_eigenstudium": module.stunden_eigenstudium,
                "credits": module.credits,
                "semester": module.semester,
                "type": module.type,
                "studiengaenge": module.studiengaenge,
                "abgestimmt_mit": module.abgestimmt_mit,
                "zuordnung_coc": module.zuordnung_coc,
                "modulbeschreibung_liegt_vor": module.modulbeschreibung_liegt_vor,
                "status": {}
            }
        }
    });

    const mapping = metaDoc["module_user_mappings"][module.username] ? [...metaDoc["module_user_mappings"][module.username], newModule.id.toString()] : [newModule.id.toString()];
    metaDoc["module_user_mappings"][module.username] = mapping;
    return await db_created_modules.insert(metaDoc);
}

exports.deleteModuleData = async (username, document_id, rev) => {
    let response = "";
    try {
        response = await db_created_modules.destroy(document_id, rev);
        let meta = await db_created_modules.get("meta");
        const index = meta["module_user_mappings"][username].indexOf(document_id);
        if (index > -1) {
            meta["module_user_mappings"][username].splice(index, 1);
        }
        await db_created_modules.insert(meta);

    } catch (err) {
        console.log(err)
    }
    try {
        response = await db_updated_modules.destroy(document_id, rev);
        let meta = await db_updated_modules.get("meta");
        const index = meta["module_user_mappings"][username].indexOf(document_id);
        if (index > -1) {
            meta["module_user_mappings"][username].splice(index, 1);
        }
        await db_updated_modules.insert(meta);

    } catch (err) {
        console.log(err)
    }
    return response;
}

exports.getAllModulesData = async () => {
    const createdModules = []

    try {
        const created_module_ids = await db_created_modules.list();
        const createdModuleIds = [];
        created_module_ids.rows.forEach((doc) => {
            if (doc.id !== "meta")
                createdModuleIds.push(doc.id);
        });


        const created_modules = await db_created_modules.fetch({ keys: createdModuleIds })
        created_modules["rows"].forEach((module) => {
            Object.keys(module.doc["versions"]).forEach((key) => {
                module.doc["versions"][key]["document_id"] = module["id"];
                createdModules.push(module.doc["versions"][key]);
            })
        });

        console.log(created_modules);

    } catch (err) {
        console.log(err);
    }

    const updatedModules = []

    try {
        const updated_module_ids = await db_updated_modules.list();
        const updatedModuleIds = [];
        updated_module_ids.rows.forEach((doc) => {
            if (doc.id !== "meta")
                updatedModuleIds.push(doc.id);
        });


        const updated_modules = await db_updated_modules.fetch({ keys: updatedModuleIds })
        updated_modules["rows"].forEach((module) => {
            updatedModules.push(module.doc);
        });
    } catch (err) {
        console.log(err);
    }

    return { "createdModules": createdModules, "updatedModules": updatedModules };
}

exports.editModuleData = async (module) => {
    const doc = await db_created_modules.get(module.document_id);
    module.module_id ? doc["versions"][module.version]["module_id"] = module.module_id : {};
    module.antragsteller ? doc["versions"][module.version]["antragsteller"] = module.antragsteller : {};
    module.modulverantwortlicher ? doc["versions"][module.version]["modulverantwortlicher"] = module.modulverantwortlicher : {};
    module.semester_start ? doc["versions"][module.version]["semester_start"] = module.semester_start : {};
    module.titel_de ? doc["versions"][module.version]["titel_de"] = module.titel_de : {};
    module.titel_en ? doc["versions"][module.version]["titel_en"] = module.titel_en : {};
    module.dozenten ? doc["versions"][module.version]["dozenten"] = module.dozenten : {};
    module.sws_v ? doc["versions"][module.version]["sws_v"] = module.sws_v : {};
    module.sws_u ? doc["versions"][module.version]["sws_u"] = module.sws_u : {};
    module.sws_p ? doc["versions"][module.version]["sws_p"] = module.sws_p : {};
    module.stunden_eigenstudium ? doc["versions"][module.version]["stunden_eigenstudium"] = module.stunden_eigenstudium : {};
    module.credits ? doc["versions"][module.version]["credits"] = module.credits : {};
    module.semester ? doc["versions"][module.version]["semester"] = module.semester : {};
    module.type ? doc["versions"][module.version]["type"] = module.type : {};
    module.studiengaenge ? doc["versions"][module.version]["studiengaenge"] = module.studiengaenge : {};
    module.abgestimmt_mit ? doc["versions"][module.version]["abgestimmt_mit"] = module.abgestimmt_mit : {};
    module.zuordnung_coc ? doc["versions"][module.version]["zuordnung_coc"] = module.zuordnung_coc : {};
    module.modulbeschreibung_liegt_vor ? doc["versions"][module.version]["modulbeschreibung_liegt_vor"] = module.modulbeschreibung_liegt_vor : {};
    return await db_created_modules.insert(doc);
}

exports.getModuleData = async (username) => {
    const newDocs = [];

    try {
        const metaDoc = await db_created_modules.get("meta");

        const docNames = metaDoc["module_user_mappings"][username]

        const docs = await db_created_modules.fetch({ keys: docNames });


        docs["rows"].forEach(document => {
            newDocs.push(document.doc);
        });

    } catch (err) {
        return [];
    }



    return newDocs;
}

exports.getMetaModuleData = async () => {
    const metaDoc = await db_created_modules.get("meta");

    const meta = {
        types: metaDoc["types"],
        semester: metaDoc["semester"],
        studiengaenge: metaDoc["studiengaenge"]
    }

    return meta;
}

exports.getAllStatusData = async () => {
    const createdMeta = await db_created_modules.get("meta");
    const updatedMeta = await db_updated_modules.get("meta");

    const status = {
        createdStatus: createdMeta["module_status"],
        updatedStatus: updatedMeta["module_status"]
    }
    return status;
}

exports.getModuleVersionData = async (query) => {
    const document = await db_created_modules.get(query._id);
    return document["versions"];
}

exports.getModuleUVersionData = async (query) => {
    return await db_updated_modules.get(query._id);
}


exports.updateModuleData = async (module) => {
    const username = module.username;
    delete module.username;
    const metaDoc = await db_updated_modules.get("meta");
    const newUpdateModule = await db_updated_modules.insert(module);
    const mapping = metaDoc["module_user_mappings"][username] ? [...metaDoc["module_user_mappings"][username], newUpdateModule.id.toString()] : [newUpdateModule.id.toString()];
    metaDoc["module_user_mappings"][username] = mapping
    return await db_updated_modules.insert(metaDoc);
}

exports.getUpdatedModulesData = async (username) => {
    const updateDocs = [];

    try {
        const metaDoc = await db_updated_modules.get("meta");

        const docNames = metaDoc["module_user_mappings"][username]

        const docs = await db_updated_modules.fetch({ keys: docNames });


        docs["rows"].forEach(document => {
            updateDocs.push(document.doc);
        });

    } catch (err) {
        console.log(err);
    }

    return updateDocs;
}

exports.getUpdatedModuleData = async (document_id) => {
    const doc = db_updated_modules.get(document_id);
    return doc;
}

exports.editUpdatedModuleData = async (module) => {
    const doc = await db_updated_modules.get(module.document_id);
    module.module_id ? doc["module_id"] = module.module_id : {};
    module.streichung !== undefined ? doc["streichung"] = module.streichung : {};
    module.modulverantwortlicher ? doc["modulverantwortlicher"] = module.modulverantwortlicher : {};
    module.semester_start ? doc["semester_start"] = module.semester_start : {};
    module.titel_de ? doc["titel_de"] = module.titel_de : {};
    module.titel_en ? doc["titel_en"] = module.titel_en : {};
    module.dozenten ? doc["dozenten"] = module.dozenten : {};
    module.sws_v ? doc["sws_v"] = module.sws_v : {};
    module.sws_u ? doc["sws_u"] = module.sws_u : {};
    module.sws_p ? doc["sws_p"] = module.sws_p : {};
    module.credits ? doc["credits"] = module.credits : {};
    module.semester ? doc["semester"] = module.semester : {};
    module.type ? doc["type"] = module.type : {};
    module.studiengaenge ? doc["studiengaenge"] = module.studiengaenge : {};
    
    return await db_updated_modules.insert(doc);
}

exports.updateCStatusData = async (status) => {
    const doc = await db_created_modules.get(status.document_id);
    Object.keys(status).forEach((key) => {
        if (key !== "document_id" && key !== "module_id" && key !== "version")
            doc["versions"][Object.keys(doc["versions"])[0]]["status"][key] = status[key];
    });


    doc["versions"][Object.keys(doc["versions"])[0]]["module_id"] = status.module_id;
    doc["versions"][status.version] = doc["versions"][Object.keys(doc["versions"])[0]];
  
    return await db_created_modules.insert(doc);
}

exports.updateUStatusData = async (status) => {
    const doc = await db_updated_modules.get(status.document_id);
    Object.keys(status).forEach((key) => {
        if (key !== "document_id" && key !== "module_id" && key !== "version")
            doc["status"][key] = status[key];

    });

    return await db_updated_modules.insert(doc);
}
