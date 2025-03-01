const express = require("express");
const connectDB = require("../config/db");
const pool = connectDB();
const { v4 } = require("uuid");
const cloudinary = require("../config/cloudinary_config");


// @desc 1. Get All Shoes ✅
// @route GET /api/shoes
// @access Public
const getShoes = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const filter = req.query.filter ? JSON.parse(req.query.filter) : null;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    try {
        let query = `
            SELECT * FROM shoe
            LEFT JOIN shoe_to_stall ON shoe.shoe_id = shoe_to_stall.shoe_id
            LEFT JOIN stall ON stall.stall_id = shoe_to_stall.stall_id
        `;

        const queryParams = [];
        if (filter && filter.id) {
            query += ` WHERE shoe.shoe_id = ANY($1::int[])`;
            queryParams.push(filter.id);
        }

        const result = await pool.query(query, queryParams);
        const shoes = result.rows;

        // If pagination parameters are not present, return the full list of shoes
        if (!req.query.page && !req.query.limit) {
            return res.status(200).json(shoes);
        }

        if (endIndex < shoes.length) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }

        results.results = shoes.slice(startIndex, endIndex);
        results.totalCount = shoes.length;

        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

// @desc 1. b Get Single Shoe
// @route GET /api/shoes/:id
// @access Private
const getShoe = async (req, res) => {
    const id = req.params.id
    try {
        const shoe_res = await pool.query(`SELECT * FROM shoe
            LEFT JOIN shoe_to_stall ON shoe.shoe_id = shoe_to_stall.shoe_id  
            LEFT JOIN stall ON stall.stall_id = shoe_to_stall.stall_id
            WHERE shoe.shoe_id=$1`, [id]);
        const shoe = shoe_res.rows[0];

        res.status(200).json(shoe);
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
}

// @desc 2. Add Stock ✅
// @route POST /api/shoes
// @access Private - Manager
const addStock = async (req, res) => {
    const { shoe_name, shoe_color, stall_id, num_of_shoes } = req.body;

    if (!shoe_name || !shoe_color) {
        res.status(400).json({
            message: "Invalid Input Fields(i.e Name/Colour)"
        });
    } else {
        // res.json(req.file); // Cannot Set Headers after they are sent to the client
        // Image URL: 

        // Existing Shoe Logic: (SELECT) ✅
        pool.query(
            `SELECT * FROM shoe WHERE shoe_name='${shoe_name}' AND shoe_color='${shoe_color}'`
        ).then(async (existing_shoe) => {
            console.log(existing_shoe);

            if (existing_shoe.rowCount > 0) {
                res.status(400).json({
                    message: "Cannot Add Shoe: Shoe Already Exists",
                });
            } else {
                // Image String: ✅
                console.log(req);

                let result;
                if (req.file) {
                    console.log(req.files);
                    result = await cloudinary.uploader.upload(req.file.path, {
                        public_id: `${v4()}_${shoe_name}_${shoe_color}`,
                        width: 500,
                        height: 500,
                        crop: 'fill'
                    });
                }

                console.log(`Result: ${result}`);
                const img_url = result ? result.url : 'https://placehold.co/500x500/jpg';
                console.log(`After Cloudinary: ${img_url}`);

                // (INSERT) INTO shoe TABLE: ✅
                pool.query(
                    `INSERT INTO shoe(shoe_name, shoe_color, shoe_img) VALUES($1, $2, $3)`,
                    [shoe_name, shoe_color, img_url]
                ).then(response => {
                    console.log(response);

                    // Fetch Newly Inserted Shoe: (SELECT) ✅
                    pool.query(`SELECT * FROM shoe WHERE shoe_name='${shoe_name}' AND shoe_color='${shoe_color}'`)
                        .then(insert_result => {
                            console.log(insert_result);
                            if (insert_result.rowCount > 0) {
                                inserted_row = insert_result.rows[0]; // Assuming it actually exists;
                                console.log(inserted_row);

                                const { shoe_id } = inserted_row;

                                if (!stall_id) {
                                    res.status(400).json({
                                        message: "Please Contact Your Admin: Invalid Stall!",
                                    });
                                }
                                // console.log(stall_id);

                                let numOfShoes = num_of_shoes != undefined ? num_of_shoes : 0;
                                // console.log(numOfShoes);

                                pool.query(
                                    `INSERT INTO shoe_to_stall(shoe_to_stall_id, shoe_id, stall_id, num_of_shoes, created_at, updated_at) VALUES ('${v4()}', $1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
                                    [shoe_id, stall_id, numOfShoes]
                                ).then(response => {
                                    console.log("New Shoe Added!", response);

                                    res.status(200).json({
                                        message: "Shoe Added Succesfully! ✅"
                                    })
                                }).catch(err => {
                                    console.log(err);

                                    res.status(400).json({
                                        message: err.message, // err: syntax error at end of input
                                    })
                                });
                            } else {
                                res.status(400).json({
                                    message: "Bad Query Detected",
                                })
                            }
                        }).catch(err => {
                            console.log(err);
                        })
                }).catch(err => {
                    console.log(err);
                    res.status(400).json({
                        message: `INSERT TO shoe error: ${err.message}`
                    });
                });
            }
        }

        ).catch(err => {
            console.log(err);
        });
    }
}

// @desc 2. Update Stock
// @route put /api/shoes
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

const deleteShoe = async (req, res) => {
    try {
        const result = await pool.query(
            `DELETE FROM shoe WHERE shoe_id=${req.params.id}`
        );

        if (result.rowCount >= 1) {
            console.log("Delete Successful");

            const response = await pool.query(`SELECT * FROM shoe
            LEFT JOIN shoe_to_stall ON shoe.shoe_id = shoe_to_stall.shoe_id
            LEFT JOIN stall ON stall.stall_id = shoe_to_stall.stall_id`);

            console.log(response.rows);
            res.status(200).json(response.rows)
        } else {
            res.status(400).json({
                message: "Already Deleted",
            })
        }
    } catch (err) {
        res.status(400).json({
            message: err.message,
        })
    }
}


module.exports = { getShoes, addStock, updateStock, getShoe, deleteShoe }