const express = require("express");
const router = express.Router();
const { protect_admin } = require("../middleware/authMiddleware");
const { addStall } = require("../controllers/stallController");

router.route("/new-stall").post(protect_admin, addStall)

module.exports = router;