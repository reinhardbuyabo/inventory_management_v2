const jwt = require("jsonwebtoken");
const connectDB = require("../config/db");
// require("dotenv").config();
const pool = connectDB();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // get the 2nd string from the array
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded); // { id: 12, iat: 1718221335, exp: 1720813335 }
            employee_result = await pool.query(`SELECT * FROM employee WHERE emp_id=${decoded.id}`);

            req.user = employee_result.rows[0];

            next();
        }
        catch (err) {
            console.log(err);
            res.status(401);
            throw new Error("Not Authorized");
        }
    }


    if (!token) {
        res.status(401);
        throw new Error("Not Authorized!");
    }
}

module.exports = {
    protect,
}