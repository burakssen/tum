const nano = require("nano");
const dotenv = require("dotenv");
dotenv.config();

exports.nano = nano(process.env.COUCHDB_URL)