const env = require('dotenv').config();
const dbSettings = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_SERVER,
    dialect: 'mssql',
    seederStorage: "sequelize"
};

module.exports = {
    development: dbSettings
};