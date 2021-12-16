const lineItemRoute = require('express').Router()
const lineItemController = require('../controller/lineItemController');
const { authentication } = require('../middleware/auth');

lineItemRoute.get('/', lineItemController.getItemAll);
lineItemRoute.post('/add', lineItemController.addItem);
lineItemRoute.get('/:id', lineItemController.getItemById);
lineItemRoute.get('/edit/:id', lineItemController.editItemPage);
lineItemRoute.put('/edit/:id', lineItemController.editItem);
lineItemRoute.delete('/delete/:id', lineItemController.deleteItem);


module.exports = lineItemRoute;