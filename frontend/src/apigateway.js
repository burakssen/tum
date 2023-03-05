import axios from "axios";
axios.defaults.withCredentials = true

const gateway = "https://localhost:8080";

export async function createModule(module) {
    return await axios.post(gateway + "/api/modules/create", {
        "username": sessionStorage.getItem("username"),
        "version": module.version,
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
    }, { withCredentials: true });
}

export async function editModule(module) {
    return await axios.post(gateway + "/api/modules/edit", {
        "document_id": module.document_id,
        "version": module.version,
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
    }, { withCredentials: true });
}

export async function getMeta() {
    return await axios.get(gateway + "/api/modules/getMeta");
}

export async function getModules() {
    return await axios.get(gateway + "/api/modules/get", {
        params: {
            "username": sessionStorage.getItem("username")
        },
        withCredentials: true
    });
}

export async function getModuleVersion(document_id, version) {
    return await axios.get(gateway + "/api/modules/getModuleVersion", {
        params: {
            "_id": document_id,
            "version": version
        },
        withCredentials: true
    });
}

export async function loginUser(username, password) {
    return await axios.post(gateway + "/api/auth/login", {
        "username": username,
        "password": password
    }, { withCredentials: true });
}

export async function logoutUser() {
    return await axios.post(gateway + "/api/auth/logout");
}

