require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const paymentRoutes = require('./routes/paymentRoutes');
const connectDB = require('./config/db');
const { AppError, handleError } = require('./utils/errors');

// Validate environment variables
const requiredEnvVars = ['MONGODB_URI', 'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET'];
for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
    }
}

const app = express();

// Middleware setup
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'razorpay_payment_id', 'razorpay_order_id', 'razorpay_signature'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));

// Body parser middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// API routes
app.use('/api/payments', paymentRoutes);

// Handle undefined routes
// app.all('*', (req, res, next) => {
//     next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
// });

// Global error handler
app.use(handleError);

// Server startup
const PORT = process.env.PORT || 5001;

const startServer = async () => {
    try {
        await connectDB();
        console.log('📦 Connected to MongoDB');

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });

        // Graceful shutdown handlers
        const handleShutdown = () => {
            server.close(() => {
                console.log('Server closed');
                process.exit(0);
            });
        };

        process.on('SIGTERM', handleShutdown);
        process.on('SIGINT', handleShutdown);

    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥');
    console.error(err);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥');
    console.error(err);
    process.exit(1);
});

startServer();