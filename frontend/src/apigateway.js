import axios from "axios";
axios.defaults.withCredentials = true

const gateway = "https://localhost:8080";

export async function createModule(module) {
    return await axios.post(gateway + "/api/modules/create", {
        "username": sessionStorage.getItem("username"),
        ...module
    }, { withCredentials: true });
}

export async function editModule(module) {
    return await axios.post(gateway + "/api/modules/edit", {
        ...module
    }, { withCredentials: true });
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
            "username": sessionStorage.getItem("username")
        },
        withCredentials: true
    });
}

export async function getAllModules() {
    return await axios.get(gateway + "/api/modules/getAllModules", { withCredentials: true });
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

export async function updateModule(module) {
    return await axios.post(gateway + "/api/modules/update", {
        "username": sessionStorage.getItem("username"),
        ...module
    }, { withCredentials: true });
}

export async function getUpdatedModules() {
    return await axios.get(gateway + "/api/modules/getUpdatedModules", {
        params: {
            "username": sessionStorage.getItem("username")
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