const { validationResult, check } = require('express-validator');

const validateDonationData = [
    check('amount')
        .isFloat({ min: 1 })
        .withMessage('Amount must be at least 1'),
    check('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Valid email is required'),
    check('name')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    check('currency')
        .optional()
        .isIn(['INR'])
        .withMessage('Only INR currency is supported'),
    check('phone')
        .optional()
        .isMobilePhone('any')
        .withMessage('Invalid phone number format'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateDonationData,
};