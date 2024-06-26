const { urlencoded } = require("body-parser")
const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")
// const errorHandler = require("errorhandler");

// App Instance
const app = express();

// App Config
// dotenv.config();
const PORT = process.env.PORT;

// MiddleWare
app.use(express.json());
app.use(urlencoded({ extended: false }));
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

