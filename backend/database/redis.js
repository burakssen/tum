const redis = require("redis");
const dotenv = require('dotenv');
dotenv.config();

const client = redis.createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
});

client.on(("error"), err => {
    console.log("Error " + err);
})


client.connect();

exports.redis = client;