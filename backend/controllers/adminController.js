const bcyrptjs = require("bcryptjs");
const connectDB = require("../config/db");
const generateToken = require("../utilities/generateJWT")

const pool = connectDB();
// @desc Admin Login
// @route /api/admin/login
// @access Public
const adminLogin = async (req, res) => {
    // 1. Obtain User Data From req.body
    const { email, password } = req.body;
    // console.log(email);

    // 2. Query Database to check if admin exists
    let admin;
    try {
        const result = await pool.query(`SELECT * FROM admin WHERE adm_email='${email}'`);
        // console.log(result); // Query Result 
        admin = result.rows[0];
        console.log(admin);
    } catch (err) {
        console.log(err);
    }

    if (admin && (await bcyrptjs.compare(password, admin.adm_pass))) {
        // console.log(`admin: ${admin}`);
        // console.log(`admin ID after querying: ${admin['adm_id']}`);
        // console.log(typeof admin['adm_id']);
        console.log(admin['adm_id']);
        res.status(200).json({
            _id: admin['adm_id'],
            name: admin['adm_name'],
            email: admin['adm_email'],
            token: generateToken(admin['adm_id']),
        });
    } else {
        res.status(400);
        next(new Error("Invalid User Details!"));
    }
}

module.exports = { adminLogin };