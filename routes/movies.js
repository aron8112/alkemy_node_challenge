const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require('../controllers/movies');

router.post(
  '/',
  [
    check('title', 'required field').not().isEmpty(),
    check('image', 'required field').not().isEmpty(),
    check('release', 'Date must be in format YYYY/MM/DD')
      .not()
      .isEmpty()
      .isDate(),
    check('rate', 'Movie rate is between 1 and 5')
      .not()
      .isEmpty()
      .isFloat({ min: 1, max: 5 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: errors.array() });
    } else {
      next()
    }
  },
  createMovie
);
router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
