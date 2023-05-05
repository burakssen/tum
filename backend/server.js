const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server started at ${process.env.PORT || 8080}`);
});
