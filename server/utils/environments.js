const dotenv = require("dotenv");
dotenv.config("../.env");
const env = {
    dev: {
        port: process.env.PORT,
    },
    prod: {},
};

module.exports = { ...env };
