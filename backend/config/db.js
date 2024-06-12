const { Pool } = require("pg");
require("dotenv").config();

const connectDB = () => {
    return new Pool({
        user: process.env.PG_USER,
        host: 'localhost',
        database: 'inventory_management',
        password: process.env.PG_PASS,
        port: process.env.PG_PORT,
    })
}

module.exports = connectDB