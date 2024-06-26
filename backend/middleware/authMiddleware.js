const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
// require("dotenv").config();
const pool = connectDB();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // get the 2nd string from the array
            console.log(token);
            // console.log(process.env.JWT_SECRET); this is okay
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded); // { id: 12, iat: 1718221335, exp: 1720813335 } // sometimes the id property isn't present
            employee_result = await pool.query(`SELECT * FROM employee WHERE emp_id=${decoded.id}`);

            if (employee_result.rows !== 0) {
                req.user = employee_result.rows[0];
            } else {
                next(new Error("Token might not be valid"))
            }

            next();
        }
        catch (err) {
            console.log(err);
            res.status(401);
            next(new Error(`Not Authorized: ${err}`));
        }
    }


    if (!token) {
        res.status(401);
        next(new Error("Not Authorized!"))
    }
}

const protect_admin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // get the 2nd string from the array
            console.log(token);
            // console.log(process.env.JWT_SECRET); this is okay
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded); // { id: 12, iat: 1718221335, exp: 1720813335 } // sometimes the id property isn't present
            employee_result = await pool.query(`SELECT * FROM admin WHERE adm_id=${decoded.id}`);

            if (employee_result.rows !== 0) {
                req.user = employee_result.rows[0];
            } else {
                next(new Error("Token might not be valid"))
            }

            next();
        }
        catch (err) {
            console.log(err);
            res.status(401);
            next(new Error(`Not Authorized: ${err}`));
        }
    }


    if (!token) {
        res.status(401);
        next(new Error("Not Authorized!"))
    }
}

module.exports = {
    protect,
    protect_admin
}