// EVEN THOUGH THESE ROUTES WHERE NOT REQUIRED, THE MAIN OBJECTIVE IS TO PROVIDE THE USER THE LIST 
// OF AVAILABLE GENRES IN OUR DATABASE, IN ORDER TO ALLOW THEM TO KNOW THE ID AND NAMES.   

const { Genre } = require('../models');
const { Router } = require('express');
const router = Router();
const { createGenre, getAllGenres, getGenreById } = require('../controllers/genres');
const { check } = require('express-validator');

router.post('/', 
[
    check('image', 'required field').not().isEmpty(),
    check('name', 'required field').not().isEmpty(),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({ error: errors.array() });
    } else {createGenre}
});

router.get('/', getAllGenres);
router.get('/:id', getGenreById);

module.exports = router;

