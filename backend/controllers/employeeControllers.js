

// @desc 1. a. Authenticate Users
// @route /api/employee/
// @access Public

const registerEmployee = (req, res) => {
    res.json({
        message: "Register Employee"
    })
}

module.exports = { registerEmployee }