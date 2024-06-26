const express = require("express");
const { getShoes, addStock, updateStock } = require("../controllers/shoeController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../employee_module/assets/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

// const upload = multer({ storage: storage });

const upload = multer({ storage: storage })

// Main Router
const router = express.Router();

router.route("/").get(getShoes).post(protect, upload.single('shoe_img'), addStock).put(protect, updateStock); // shoe route


// Exporting the Router
module.exports = router