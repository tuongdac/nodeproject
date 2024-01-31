const { Router } = require("express");
const { userController } = require('../controller');


const loginRouter = Router();

loginRouter.post('/login', userController.loginUser);
loginRouter.post('/register', userController.register);

module.exports = loginRouter;
