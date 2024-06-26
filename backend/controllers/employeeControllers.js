const bcyrptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
const pool = connectDB();
const generateToken = require("../utilities/generateJWT");
const dotenv = require("dotenv");
dotenv.config();

// @desc 1. a. Authenticate Users ✅
// @route POST /api/employee/
// @access Public

const registerEmployee = async (req, res, next) => {
    const { name, email, password } = req.body;
    // console.log(name);

    // 1. Validate presence of input
    if (!name || !email || !password) {
        res.status(400);
        next(new Error("Please add all fields"));
    }

    // 2. Check if user exists
    let userExists;
    try {
        userExists = await pool.query(`SELECT * FROM employee WHERE emp_email='${email}'`);
        // console.log(userExists);
    } catch (err) {
        console.log(err);
        next(new Error(`Something Went Wrong! ${err}`));
    }

    // console.log(userExists.rows); // Just before we res.error user already existss
    if (userExists.rows.length !== 0) {
        res.status(400);
        next(new Error("User Already Exists!"));
    } else {
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
            console.log(`Employee ID before generating token: ${emp_id.rows[0].emp_id}`);
            console.log(typeof emp_id.rows[0].emp_id)
            res.status(201).json({
                _id: emp_id.rows[0].emp_id,
                name,
                email,
                token: generateToken(emp_id.rows[0].emp_id)
            });
        } else {
            res.status(400);
            next(new Error("Invalid User Data!"));
        }
    }
}

// @desc 1. b. Authentication - Login ✅
// @route POST /api/employee/login
// @access Public
const loginEmployee = async (req, res, next) => {
    // 1. Obtain User Data From req.body
    const { email, password } = req.body;
    // console.log(email);

    // 2. Query Database to check if employee exists
    let employee;
    try {
        const result = await pool.query(`SELECT * FROM employee WHERE emp_email='${email}'`);
        // console.log(result); // Query Result 
        employee = result.rows[0];
        console.log(employee);
    } catch (err) {
        console.log(err);
    }

    if (employee && (await bcyrptjs.compare(password, employee.emp_pass))) {
        // console.log(`Employee: ${employee}`);
        // console.log(`Employee ID after querying: ${employee['emp_id']}`);
        // console.log(typeof employee['emp_id']);
        console.log(employee['emp_id']);
        res.status(200).json({
            _id: employee['emp_id'],
            name: employee['emp_name'],
            email: employee['emp_email'],
            token: generateToken(employee['emp_id']),
        });
    } else {
        res.status(400);
        next(new Error("Invalid User Details!"));
    }
}

// @desc 2. Get Employee By Id (Test Middleware Auth) ✅
// @route GET /api/employee/me
// @access Private
const getMe = async (req, res) => {
    try {
        res.json({
            id: req.user['emp_id'],
            name: req.user['emp_name'],
            email: req.user['emp_email']
        })
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: `Error ${err}`
        })
    }
}

module.exports = { registerEmployee, loginEmployee, getMe }