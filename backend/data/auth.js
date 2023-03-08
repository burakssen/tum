const { nano } = require("../database/couchdb");
const { cryptPassword } = require("../utils/encryption");
const db = nano.use("module_app_users");


exports.getWithUsernameData = async (_username) => {
    const query = {
        selector: {
            username: _username,
        },
        limit: 1
    }

    return (await db.find(query)).docs[0];
}

exports.createUserData = async (_body) => {
    return await db.insert({
        username: _body.username,
        password: await cryptPassword(_body.password),
        role: _body.role ? _body.role : "normal"
    });
}

