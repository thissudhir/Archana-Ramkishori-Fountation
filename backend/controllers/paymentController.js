const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Donation = require('../models/Donation');
const { AppError } = require('../utils/errors');

const paymentController = {
    createPaymentIntent: async (req, res, next) => {
        try {
            const { amount, currency = 'usd', email } = req.body;

            if (!amount || amount <= 0) {
                throw new AppError('Invalid amount', 400);
            }

            if (!email) {
                throw new AppError('Email is required', 400);
            }

            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency,
                metadata: { email },
                automatic_payment_methods: { enabled: true },
            });

            await Donation.create({
                transactionId: paymentIntent.id,
                amount,
                currency,
                donor: { email },
                status: 'pending',
                paymentMethod: 'stripe',
            });

            res.status(201).json({
                clientSecret: paymentIntent.client_secret,
            });
        } catch (error) {
            next(error);
        }
    },

    handleWebhook: async (req, res, next) => {
        try {
            const sig = req.headers['stripe-signature'];
            
            if (!sig) {
                throw new AppError('No Stripe signature found', 400);
            }

            const event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            switch (event.type) {
                case 'payment_intent.succeeded':
                    await handleSuccessfulPayment(event.data.object);
                    break;
                case 'payment_intent.payment_failed':
                    await handleFailedPayment(event.data.object);
                    break;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }

            res.json({ received: true });
        } catch (error) {
            next(error);
        }
    },
};

async function handleSuccessfulPayment(paymentIntent) {
    await Donation.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        {
            status: 'completed',
            'donor.name': paymentIntent.shipping?.name,
        },
        { new: true }
    );
}

async function handleFailedPayment(paymentIntent) {
    await Donation.findOneAndUpdate(
        { transactionId: paymentIntent.id },
        { status: 'failed' },
        { new: true }
    );
}

module.exports = paymentController;