const { urlencoded } = require("body-parser")
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")
// const errorHandler = require("errorhandler");
const cors = require("cors");
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');


// App Instance
const app = express();

// App Config
// dotenv.config();
const PORT = process.env.PORT;

// MiddleWare
app.use(express.json());
app.use(cors());
app.use(urlencoded({ extended: true }));
// app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// DB Config
// const pool = connectDB();

// API Endpoints
app.use("/api/shoes", require("./routes/shoeRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/stall", require("./routes/stallRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Error Handler Middleware
app.use(errorHandler)

// Server
app.listen(PORT, () => {
    console.log("Listening on Port " + 3000);
});

