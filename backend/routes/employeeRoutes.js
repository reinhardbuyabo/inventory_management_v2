const express = require("express");
const { registerEmployee, loginEmployee, getMe } = require("../controllers/employeeControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Register User
router.route("/").post(registerEmployee);
router.route("/login").post(loginEmployee)
router.route("/me").get(protect, getMe);

module.exports = router;