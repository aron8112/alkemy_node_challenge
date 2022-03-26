const { Router } = require('express');
const router = Router();
const checkToken = require('../middlewares/getToken')
const moviesRoutes = require('./movies')
const usersRoutes = require('./users')
const genreRoutes = require('./genre')
const charactersRoutes = require('./characters')

router.get('/', (req, res) => 
res.send('This is root!'));

router.use('/users', usersRoutes);
router.use('/movies', checkToken, moviesRoutes);
router.use('/genres', checkToken, genreRoutes)
router.use('/characters', checkToken, charactersRoutes)


module.exports = router;