const errorHandler = (err, req, res, next) => {
    // If the status code exists then store it in the variable
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode); // putting the status code as the response via this middleware
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack // logging to the console the stack error in the event that our environment variables have been set to be production ones
    });

}

module.exports = {
    errorHandler
}

