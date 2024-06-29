const express = require("express");
const { getShoes, addStock, updateStock, getShoeImage } = require("../controllers/shoeController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({});

// const upload = multer({ storage: storage });

const upload = multer({ storage: storage })

// Main Router
const router = express.Router();

router.route("/").get(getShoes).post(protect, upload.single('shoe_img'), addStock).put(protect, upload.single('shoe_img'), updateStock); // shoe route
router.route("/:id").get(getShoeImage);


// Exporting the Router
module.exports = router