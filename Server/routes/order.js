const orderController = require('../controller/orderController');
const orderRoute = require("express").Router();
const { authentication } = require('../middleware/auth');


orderRoute.get('/all', orderController.getOrderAll);
orderRoute.post('/user', authentication, orderController.getOrder);
orderRoute.get('/', authentication, orderController.getOrderAll);
orderRoute.post('/add', authentication, orderController.addOrder);


module.exports = orderRoute;