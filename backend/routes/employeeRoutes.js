const express = require("express");
const { registerEmployee, loginEmployee } = require("../controllers/employeeControllers");
const router = express.Router();

// Register User
router.route("/").post(registerEmployee);
router.route("/login").post(loginEmployee)

module.exports = router;