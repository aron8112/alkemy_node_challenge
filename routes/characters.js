const { Router } = require('express');
const router = Router();
const { check, validationResult } = require('express-validator');

const {
  createCharacter,
  getAllCharacters,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} = require('../controllers/characters');

router.post(
  '/',
  [
    check('image', 'required field').not().isEmpty(),
    check('name', 'required field').not().isEmpty(),
    check('weight', 'required field').not().isEmpty().isFloat(),
    check('age', 'required field').not().isEmpty().isFloat(),
    check('history', 'required field').not().isEmpty(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: errors.array() });
    } else {
      next()
    }
  },
  createCharacter
);

router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacter);
router.delete('/:id', deleteCharacter);

module.exports = router;
