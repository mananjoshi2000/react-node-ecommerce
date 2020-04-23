exports.userSignupValdator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty();
    
    req.check('email', 'Email is required').notEmpty();
    req.check('password')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 32
        }).withMessage('Email must be between 4 to 32 characters');

    req.check('password', 'passord is required').notEmpty();
    req.check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');

    const errors = req.validationErrors();
    if(errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({
            error: firstError
        });
    }
    next();
}