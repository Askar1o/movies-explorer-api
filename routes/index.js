const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { createUser, login, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { createUserValidation, loginValidation } = require('../utils/validationConfig');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/signout', signOut);

router.use('*', (req, res, next) => next(new NotFoundError('Указан некорректный маршрут')));

module.exports = router;
