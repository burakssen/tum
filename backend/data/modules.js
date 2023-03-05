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
                "credits": module.credits,
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

exports.editModuleData = async (module) => {
    const doc = await db.get(module.document_id);
    doc["versions"][module.version]["module_id"] = module.module_id;
    doc["versions"][module.version]["antragsteller"] = module.antragsteller;
    doc["versions"][module.version]["modulverantwortlicher"] = module.modulverantwortlicher;
    doc["versions"][module.version]["semester_start"] = module.semester_start;
    doc["versions"][module.version]["titel_de"] = module.titel_de;
    doc["versions"][module.version]["titel_en"] = module.titel_en;
    doc["versions"][module.version]["dozenten"] = module.dozenten;
    doc["versions"][module.version]["sws_v"] = module.sws_v;
    doc["versions"][module.version]["sws_u"] = module.sws_u;
    doc["versions"][module.version]["sws_p"] = module.sws_p;
    doc["versions"][module.version]["stunden_eigenstudium"] = module.stunden_eigenstudium;
    doc["versions"][module.version]["credits"] = module.credits;
    doc["versions"][module.version]["semester"] = module.semester;
    doc["versions"][module.version]["type"] = module.type;
    doc["versions"][module.version]["studiengaenge"] = module.studiengaenge;
    doc["versions"][module.version]["abgestimmt_mit"] = module.abgestimmt_mit;
    doc["versions"][module.version]["zuordnung_coc"] = module.zuordnung_coc;
    doc["versions"][module.version]["modulbeschreibung_liegt_vor"] = module.modulbeschreibung_liegt_vor;
    return await db.insert(doc);
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

exports.updateModuleData = async (module) => {
    const updateModule = {
        "module_id": module.module_id,
        "titel_de": module.titel_de,
        "title_en": module.titel_en,
        "credits": module.credits,
        "semester": module.semester,
        "semester_start": module.semester_start,
        "sws_u": module.sws_u,
        "sws_v": module.sws_v,
        "sws_p": module.sws_p,
        "type": module.type,
        "stunden_eigenstudium": module.stunden_eigenstudium,
        "modulverantwortlicher": module.modulverantwortlicher,
        "dozenten": module.dozenten
    }
}