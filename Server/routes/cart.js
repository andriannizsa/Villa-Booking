const cartRoute = require('express').Router()
const cartController = require('../controller/cartController');
const { authentication } = require('../middleware/auth');

cartRoute.get('/all', cartController.getCartAll);
cartRoute.get('/', authentication, cartController.getCart);
cartRoute.post('/add', authentication, cartController.addCart);
cartRoute.get('/:id', cartController.getCartById);
cartRoute.get('/edit/:id', cartController.editCartPage);
cartRoute.put('/edit/:id', authentication, cartController.editCart);
cartRoute.delete('/delete/:id', authentication, cartController.deleteCart);


module.exports = cartRoute;