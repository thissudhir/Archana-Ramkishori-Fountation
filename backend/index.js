const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const paymentRoutes = require('./routes/paymentRoutes');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(helmet());
app.use('/api/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// Routes
app.use('/api/payments', paymentRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Something went wrong!'
    });
});

connectDB();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});