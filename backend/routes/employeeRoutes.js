const express = require("express");
const { registerEmployee } = require("../controllers/employeeControllers");
const router = express.Router();

// Register User
router.route("/").post(registerEmployee);

module.exports = router;