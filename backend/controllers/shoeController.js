const express = require("express");
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
        ).then(existing_shoe => {
            console.log(existing_shoe);

            if (existing_shoe.rowCount > 0) {
                res.status(400).json({
                    message: "Cannot Add Shoe: Shoe Already Exists",
                });
            } else {
                // Image String: ✅
                const img_url = `${req.file.destination}/${req.file.filename}`
                // console.log(img_url);

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

        // console.log(existing_shoe.rows);
        // if (existing_shoe.rowCount > 0) {
        //     res.status(400).json({
        //         message: "Cannot Add Shoe: Shoe Already Exists",
        //     });
        // }

        // // Image String: ✅
        // const img_url = `${req.file.destination}/${req.file.filename}`
        // // console.log(img_url);

        // // (INSERT) INTO shoe TABLE: ✅
        // let inserted_row;
        // await pool.query(
        //     `INSERT INTO shoe(shoe_name, shoe_color, shoe_img) VALUES($1, $2, $3)`,
        //     [shoe_name, shoe_color, img_url]
        // ).then(response => {
        //     console.log(response);

        // }).catch(err => {
        //     console.log(err);
        //     res.status(400).json({
        //         message: `INSERT TO shoe error: ${err.message}`
        //     });
        // });

        // // Fetch Newly Inserted Shoe: (SELECT)
        // const insert_result = await pool.query(`SELECT * FROM shoe WHERE shoe_name='${shoe_name}' AND shoe_color='${shoe_color}'`);
        // console.log(insert_result);

        // if (insert_result.rows > 0) {
        //     inserted_row = insert_result.rows[0]; // Assuming it actually exists;
        //     console.log(inserted_row);
        // } else {
        //     res.status(400).json({
        //         message: "Bad Query Detected",
        //     })
        // }

        // console.log("Inserted Shoe minus Number of Shoes: ");
        // console.log(inserted_row);
        // if (inserted_row) {
        //     console.log(`Inserted Row: ${inserted_row}`);
        //     // all this trouble just to get shoe_id?
        //     const { shoeId } = inserted_row;

        //     if (!stall_id) {
        //         res.status(400).json({
        //             message: "Please Contact Your Admin: Invalid Stall!",
        //         });
        //     }

        //     let numOfShoes;
        //     if (!num_of_shoes) {
        //         numOfShoes = 0;
        //     }

        //     pool.query(
        //         `INSERT INTO shoe_to_stall(shoe_to_stall_id, shoe_id, stall_id, num_of_shoes, created_at, updated_at) VALUES ('${v4()}', $1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
        //         [shoeId, stall_id, num_of_shoes || numOfShoes]
        //     ).then(res => {
        //         console.log("New Shoe Added.", res);
        //     }).catch(err => {
        //         console.log("Error Inserting Number of Shoes.", err.stack);
        //     });
        // }
    }

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