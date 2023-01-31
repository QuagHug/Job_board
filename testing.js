const env = require("env");

env.config();
console.log(process.env.DB_URI);