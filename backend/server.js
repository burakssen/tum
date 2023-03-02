const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
dotenv.config();

const app = require("./app");

https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app).listen(process.env.PORT || 8080, () => {
    console.log(`Server started at ${process.env.PORT || 8080}`);
});
