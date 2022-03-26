const { Router } = require('express');
const router = Router();
const { createUser, signInUser } = require('../controllers/users');
const { check, validationResult } = require('express-validator')

router.post('/auth/register', 
[
    check('username', 'username can not be empty').not().isEmpty(),
    check('email', 'It must be a valid email').not().isEmpty().isEmail(),
    check('password', 'password can not be empty').not().isEmpty(),
], async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    } else { 
        next()
    }
}, 
createUser
);
router.post('/auth/login',
[
    check('username', 'username can not be empty').not().isEmpty(),
    check('email', 'It must be a valid email').isEmail(),
    check('password', 'password can not be empty').not().isEmpty(),
], async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({errors: errors.array()})
    } else { 
        next()
    }
},
signInUser);


module.exports = router;