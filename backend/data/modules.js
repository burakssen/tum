const { nano } = require("../database/couchdb");
const db = nano.use("module_app_modules");

exports.createModuleData = async (module) => {

    const metaDoc = await db.get("meta");
    const newModule = await db.insert({
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
                "credits": module.creadits,
                "semester": module.semester,
                "type": module.type,
                "studiengaenge": module.studiengaenge,
                "abgestimmt_mit": module.abgestimmt_mit,
                "zuordnung_coc": module.zuordnung_coc,
                "modulbeschreibung_liegt_vor": module.modulbeschreibung_liegt_vor
            }
        }
    });

    const mapping = metaDoc["module_user_mappings"][module.username] ? [...metaDoc["module_user_mappings"][module.username], newModule.id.toString()] : newModule.id.toString();
    metaDoc["module_user_mappings"][module.username] = mapping;
    return await db.insert(metaDoc);
}

exports.getModuleData = async (username) => {
    const metaDoc = await db.get("meta");
    const docNames = metaDoc["module_user_mappings"][username];
    const docs = await db.fetch({ keys: docNames });
    const newDocs = [];
    docs["rows"].forEach(document => {
        newDocs.push(document.doc);
    });
    return newDocs;
}

exports.getMetaModuleData = async () => {
    const metaDoc = await db.get("meta");

    const meta = {
        types: metaDoc["types"],
        semester: metaDoc["semester"],
        studiengaenge: metaDoc["studiengaenge"]
    }

    return meta;
}

exports.getModuleVersionData = async (query) => {
    const document = await db.get(query._id);
    return document["versions"][query.version];
}