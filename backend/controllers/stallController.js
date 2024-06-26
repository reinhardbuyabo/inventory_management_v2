const connectDB = require("../config/db")
const autoCapitalize = require("../utilities/capitalize")

const pool = connectDB();

// @desc Add Stall
// @route /api/stall/new-stall
// @access Private
const addStall = async (req, res) => {
    const { stall_location, mgr_id } = req.body;

    const location_exists = await pool.query(
        `SELECT stall_location FROM stall WHERE stall_location='${autoCapitalize(stall_location)}'`
    );

    console.log(location_exists);

    if (location_exists.rowCount > 0) {
        res.status(400).json({
            "message": "Location Already Exists in the Database"
        })
    } else {
        pool.query(
            `INSERT INTO stall(stall_location, mgr_id) VALUES($1, $2)`,
            [stall_location, mgr_id],
            (err, response) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(response);
                    res.status(200).json({
                        stall_location,
                        mgr_id
                    });
                }
            }
        );
    }

}

module.exports = { addStall }