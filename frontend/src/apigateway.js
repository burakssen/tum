import axios from "axios";
axios.defaults.withCredentials = true

const gateway = "https://modulmanager.ldv.ei.tum.de";

export async function getCsrf() {
    return await axios.get(gateway + "/api/auth/csrf");
}

export function setCsrf(csrf) {
    axios.defaults.headers.common['x-csrf-token'] = csrf;
}

export async function createModule(module) {
    return await axios.post(gateway + "/api/modules/create", {
        "username": JSON.parse(sessionStorage.getItem("user")).tumKennung,
        ...module
    }, { withCredentials: true });
}

export async function editModule(module) {
    return await axios.post(gateway + "/api/modules/edit", {
        ...module
    }, { withCredentials: true });
}

export async function deleteDocument(document_id, document_type, rev) {
    return await axios.post(gateway + "/api/modules/delete", {
        "username": JSON.parse(sessionStorage.getItem("user")).tumKennung,
        "document_id": document_id,
        "document_type": document_type,
        "rev": rev
    });
}

export async function getMeta() {
    return await axios.get(gateway + "/api/modules/getMeta", { withCredentials: true });
}

export async function getAllStatus() {
    return await axios.get(gateway + "/api/modules/getAllStatus", { withCredentials: true });
}

export async function getModules() {
    return await axios.get(gateway + "/api/modules/get", {
        params: {
            "username": JSON.parse(sessionStorage.getItem("user")).tumKennung
        },
        withCredentials: true
    });
}

export async function getAllModules() {
    return await axios.get(gateway + "/api/modules/getAllModules", { withCredentials: true });
}

export async function getModuleVersion(document_id, version, pageType) {
    if (pageType === "create") {
        return await axios.get(gateway + "/api/modules/getModuleVersion", {
            params: {
                "_id": document_id
            },
            withCredentials: true
        });
    }
    else {

        return await axios.get(gateway + "/api/modules/getModuleUVersion", {
            params: {
                "_id": document_id
            },
            withCredentials: true
        });
    }

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

export async function updateModule(module) {
    return await axios.post(gateway + "/api/modules/update", {
        "username": JSON.parse(sessionStorage.getItem("user")).tumKennung,
        ...module
    }, { withCredentials: true });
}

export async function getUpdatedModules() {
    return await axios.get(gateway + "/api/modules/getUpdatedModules", {
        params: {
            "username": JSON.parse(sessionStorage.getItem("user")).tumKennung
        },
        withCredentials: true
    })
}

export async function getUpdatedModule(document_id) {
    return await axios.get(gateway + "/api/modules/getUpdatedModule", {
        params: {
            "document_id": document_id
        },
        withCredentials: true
    });
}

export async function editUpdatedModule(module) {
    return await axios.post(gateway + "/api/modules/editUpdatedModule", {
        ...module
    }, { withCredentials: true });
}

export async function getUserRole() {
    return await axios.get(gateway + "/api/auth/getUserRole", { withCredentials: true });
}

export async function updateStatus(document_id, moduleChange, statusValues, pageType) {
    if (pageType === "create") {
        return await axios.post(gateway + "/api/modules/updateCStatus", {
            "document_id": document_id,
            ...moduleChange,
            ...statusValues
        }, { withCredentials: true });
    }
    else {
        return await axios.post(gateway + "/api/modules/updateUStatus", {
            "document_id": document_id,
            ...moduleChange,
            ...statusValues
        }, { withCredentials: true });
    }
}

export async function loginButtonCall() {
    return await axios.get("https://modulmanager.ldv.ei.tum.de/api/auth/Shibboleth.sso/access", {
        withCredentials: true
    });
}