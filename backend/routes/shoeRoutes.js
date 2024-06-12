const express = require("express");
const { getShoes } = require("../controllers/shoeController");

// Main Router
const router = express.Router();

router.route("/").get(getShoes); // shoe route

// Exporting the Router
module.exports = router