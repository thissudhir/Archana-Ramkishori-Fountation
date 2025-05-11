const { validationResult, check } = require('express-validator');

const validatePaymentIntent = [
    check('amount')
        .isFloat({ min: 0.5 })
        .withMessage('Amount must be at least 0.50'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Must provide a valid email'),
    check('currency')
        .optional()
        .isIn(['usd', 'eur', 'gbp'])
        .withMessage('Invalid currency'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validatePaymentIntent,
};