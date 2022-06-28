const {Router} = require('express');
const userController = require('./controllers/userController');
const authentification = require('./middlewares/jasonWebToken');
const userSchema = require('./schemas/userSchema');
const {validateBody} = require('./middlewares/Validation');
const { JsonWebTokenError } = require('jsonwebtoken');


const router = Router();

router.get('/user', userController.findAll);

router.get('/user/:id', userController.findOne);

router.post('/signup', validateBody(userSchema), userController.validSignup);

router.post('/login', userController.validLogin);

router.delete('/user', authentification, userController.deleteUser);


module.exports = router;
