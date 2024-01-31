const { Router } = require("express");
const { verifyUser } = require("../middleware/auth.middleware");


const appRouter = Router();

appRouter.use('/auth', require('./auth.router'));
appRouter.use('/user', verifyUser, require('./user.router'));
// appRouter.use('/comment', require('./commentRouter'));
appRouter.use('/auth', require('./auth.router'));
appRouter.use('/invoice', verifyUser, require('./invoice.router'));
appRouter.use('/product', verifyUser, require('./product.router'));
appRouter.use('/file', require('./file.router'));

module.exports = appRouter;
