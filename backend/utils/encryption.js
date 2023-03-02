const bcrypt = require('bcrypt');

exports.cryptPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

exports.comparePassword = async (plainPass, hash) => {
    return await bcrypt.compare(plainPass, hash);
};