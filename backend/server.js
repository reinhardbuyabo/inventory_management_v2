const { urlencoded } = require("body-parser")
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db")

// App Instance
const app = express();

// App Config
dotenv.config();
const PORT = process.env.PORT;

// MiddleWare
app.use(express.json());
app.use(urlencoded({ extended: false }));

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

// API Endpoints
app.use("/api/shoes", require("./routes/shoeRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));

// Server
app.listen(PORT, () => {
    console.log("Listening on Port " + 3000);
})