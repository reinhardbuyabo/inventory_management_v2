const express = require("express");
const app = express()
const connectDB = require("../config/db");
const pool = connectDB();

// @desc 1. Get All Shoes ✅
// @route GET /api/shoes
// @access Public
const getShoes = async (req, res) => {

    try {
        // pool.query returns a promise
        const result = await pool.query("SELECT * FROM Shoe");
        console.log(result);
        const shoes = result.rows;
        res.status(201).json(shoes);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}

module.exports = { getShoes }