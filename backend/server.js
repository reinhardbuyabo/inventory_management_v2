const express = require("express");
// App Instance
const app = express();

// MiddleWare

// DB Config

// Routes
// Get Routes
app.get("/", (req, res) => {
    res.json({
        message: "Hello World!"
    })
})

// Server
app.listen("3000", () => {
    console.log("Listening on Port 3000");
})