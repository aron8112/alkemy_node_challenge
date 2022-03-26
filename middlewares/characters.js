const { body } = require('express-validator');

module.exports = 
[
    check('image', 'required field').not().isEmpty(),
    check('name', 'required field').not().isEmpty(),
    check('weight', 'required field').not().isEmpty().isFloat(),
    check('weight', 'required field').not().isEmpty().isFloat(),
    check('history', 'required field').not().isEmpty(),
],
async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ error: errors.array() });
    } else {
        next ()
    }
};