import { NODE_ENV } from '../config/env.js';

const errorHandler = (err, req, res, next) => {
    // 1. Set default values if the error doesn't have them
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // 2. Log the error for the developer
    console.error(`[ERROR] ${req.method} ${req.url} : ${message}`);

    // 3. Log error for debugging (in development mode)
    if (NODE_ENV === 'development') {
        console.error('Error:', err);
    }

    // 4. Handle Mongoose Bad ObjectId (CastError)
    // Happens if you search for an ID that doesn't exist
    if (err.name === 'CastError') {
        message = `Resource not found with id of ${err.value}`;
        statusCode = 404;
    }

    // 5. Handle Mongoose Duplicate Key Error (11000)
    // Happens if a user signs up with an existing email/username
    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        statusCode = 400;
    }

    // 6. Handle Mongoose Validation Error
    // Happens if the data doesn't match your Schema rules
    if (err.name === 'ValidationError') {
        message = Object.values(err.errors).map(val => val.message);
        statusCode = 400;
    }

    // 7. Final Response
    res.status(statusCode).json({
        success: false,
        error: message,
        // Include the stack trace only in development mode
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });

}

export default errorHandler ;