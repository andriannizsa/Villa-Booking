const villaRoute = require('express').Router()
const villaController = require('../controller/villaController');
const { authentication } = require('../middleware/auth');
const {upload} = require('../middleware/multer');

villaRoute.get('/all', villaController.getVillaAll);
villaRoute.get('/:id', villaController.getVillaById);
villaRoute.get('/',  authentication, villaController.getVilla);
villaRoute.post('/add', authentication, upload.array("images", 3), villaController.addVilla)
villaRoute.get('/edit/:id', villaController.editVillaPage);
villaRoute.put('/edit/:id', authentication, villaController.editVilla);
villaRoute.delete('/delete/:id', authentication, villaController.deleteVilla);

module.exports = villaRoute;