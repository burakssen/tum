import axios from "axios";
axios.defaults.withCredentials = true

const gateway = "https://localhost:8080";

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
    console.log(document_id);
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

