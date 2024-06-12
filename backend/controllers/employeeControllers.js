const bcyrptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
const pool = connectDB();
require("dotenv").config()

// @desc 1. a. Authenticate Users
// @route /api/employee/
// @access Public

const registerEmployee = async (req, res) => {
    const { name, email, password } = req.body;
    // console.log(name);

    // 1. Validate presence of input
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // 2. Check if user exists
    let userExists;
    try {
        userExists = await pool.query(`SELECT * FROM employee WHERE emp_email='${email}'`);
        // console.log(userExists);
    } catch (err) {
        console.log(err);
        throw new Error("Something Went Wrong!");
    }

    console.log(userExists.rows);
    if (userExists.rows.length !== 0) {
        res.status(400);
        throw new Error("User Already Exists!");
    }

    // 3. Hashing The Password:
    const salt = await bcyrptjs.genSalt(10); // 10 rounds
    const hashedPassword = await bcyrptjs.hash(password, salt);

    // 4. Create User in the Database.
    let new_employee_inserted, emp_id;
    try {
        const { rowCount } = await pool.query(`INSERT INTO employee(emp_name, emp_email, emp_pass) VALUES ('${name}', '${email}', '${hashedPassword}')`);
        // console.log(rowCount);
        emp_id = await pool.query(`SELECT emp_id FROM employee WHERE emp_email='${email}'`);
        // console.log(emp_id);
        new_employee_inserted = rowCount === 1 ? true : false;
    } catch (err) {
        console.log(err);
    }

    if (new_employee_inserted) {
        res.status(201).json({
            _id: emp_id.rows[0].emp_id,
            name,
            email,
            token: generateToken(emp_id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid User Data!");
    }
}

// Utilities:
const generateToken = id => {
    return jwt.sign(
        { id }, // we're putting the user id as the payload so that when we decode the token, we get the 'id'
        process.env.JWT_SECRET, // we sign the token with the secret that is provided ...
        { expiresIn: '30d' }
    );
}

module.exports = { registerEmployee }