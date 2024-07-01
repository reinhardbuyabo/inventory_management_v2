const express = require("express");
const { getShoes, addStock, updateStock, getShoeImage } = require("../controllers/shoeController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("From Middleware!");
        console.log(file);
        cb(null, '../uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

// const upload = multer({ storage: storage })

// Main Router
const router = express.Router();

router.route("/").get(getShoes).post(protect, upload.single('file'), addStock).put(protect, upload.single('shoe_img'), updateStock); // shoe route
router.route("/:id").get(getShoeImage);


// Exporting the Router
module.exports = router