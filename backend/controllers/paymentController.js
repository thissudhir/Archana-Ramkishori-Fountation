const Razorpay = require('razorpay');
const crypto = require('crypto');
const Donation = require('../models/Donation');
const { AppError } = require('../utils/errors');

// Validate required environment variables
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new AppError('Razorpay credentials are not configured', 500);
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentController = {
    createOrder: async (req, res, next) => {
        try {
            const { amount, currency = 'INR', email, name } = req.body;

            // Validate inputs
            if (!amount || amount <= 0) {
                throw new AppError('Amount must be greater than 0', 400);
            }

            if (!email) {
                throw new AppError('Email is required', 400);
            }

            if (!name) {
                throw new AppError('Name is required', 400);
            }


            const options = {
                amount: Math.round(amount * 100), // amount in paisa
                currency,
                receipt: `rcpt_${Date.now()}`,
            };

            const order = await razorpay.orders.create(options);

            await Donation.create({
                orderId: order.id,
                amount: amount,
                currency,
                donor: { email, name },
                status: 'pending',
                paymentMethod: 'razorpay',
            });

            res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    },

    verifyPayment: async (req, res, next) => {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

            const body = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSignature = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                .update(body.toString())
                .digest("hex");

            if (expectedSignature !== razorpay_signature) {
                throw new AppError('Invalid payment signature', 400);
            }

            await Donation.findOneAndUpdate(
                { orderId: razorpay_order_id },
                {
                    status: 'completed',
                    transactionId: razorpay_payment_id,
                    updatedAt: new Date()
                },
                { new: true }
            );

            res.status(200).json({
                message: "Payment verified successfully"
            });
        } catch (error) {
            next(error);
        }
    },

    getDonationHistory: async (req, res, next) => {
        try {
            const { email } = req.query;

            if (!email) {
                throw new AppError('Email is required', 400);
            }

            const donations = await Donation.find({
                'donor.email': email,
                status: 'completed'
            }).sort({ createdAt: -1 });

            res.status(200).json(donations);
        } catch (error) {
            next(error);
        }
    }
};

module.exports = paymentController;