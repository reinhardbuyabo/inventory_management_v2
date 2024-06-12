const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")

// App Instance
const app = express();

// App Config
dotenv.config();
const PORT = process.env.PORT;

// MiddleWare

// DB Config
const pool = connectDB();

// Routes
// Get Routes

// /GET
app.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

// GET 2
app.get('/shoes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Shoe');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Server
app.listen(PORT, () => {
    console.log("Listening on Port " + 3000);
})