const errorHandler = (err, re, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    console.error(err);

    res.status(statusCode).json({
        success : false,
        message,
        stack : process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandler;