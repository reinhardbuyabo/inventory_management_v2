const express = require("express");
const app = express()
const connectDB = require("../config/db");
const pool = connectDB();
const { v4 } = require("uuid");

// @desc 1. Get All Shoes ✅
// @route GET /api/shoes
// @access Public
const getShoes = async (req, res) => {

    try {
        // pool.query returns a promise
        const result = await pool.query("SELECT * FROM shoe");
        console.log(result);
        const shoes = result.rows;
        res.status(200).json(shoes);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}

// @desc 2. Add Stock
// @route POST /api/shoes
// @access Private - Manager
const addStock = (req, res) => {
    // const { shoe_name, shoe_color, shoe_img, shoe_id, stall_id, num_of_shoes } = req.body;

    // // SHORTFALL
    // pool.query(`INSERT INTO shoe_to_stall(shoe_to_stall_id, shoe_id, stall_id, num_of_shoes, created_at, updated_at) VALUES ('${v4()}', $1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`, [shoe_id, stall_id, num_of_shoes], (err, response) => {
    //     if (err) {
    //         console.log(err);

    //         res.status(400).json({
    //             "message": err.detail
    //         })
    //     } else {
    //         console.log(response);
    //         // res.json(response.rows[0]);

    //         res.status(200).json({
    //             "message": `Added ${num_of_shoes} of Shoe Id: ${shoe_id} to Database`
    //         })
    //     }
    // });

    // res.json(req.file);
    // res.send("Upload Successfull.");
    res.json(req.file);
}

// @desc 2. Update Stock
// @route POST /api/shoes
// @access Private - Manager
const updateStock = (req, res) => {
    const { shoe_id, stall_id, num_of_shoes } = req.body;

    pool.query(
        `UPDATE shoe_to_stall SET num_of_shoes=$3, updated_at=CURRENT_TIMESTAMP WHERE shoe_id=$1 AND stall_id=$2`,
        [shoe_id, stall_id, num_of_shoes],
        (err, response) => {
            if (err) {
                console.log(err);

                res.status(400).json({
                    "message": err.detail
                })
            } else {
                console.log(response);
                // res.json(response.rows[0]);

                res.status(200).json({
                    "message": `Updated ${num_of_shoes} of Shoe Id: ${shoe_id} to Database`
                })
            }
        });
}


module.exports = { getShoes, addStock, updateStock }