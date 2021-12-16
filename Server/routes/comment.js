const commentRoute = require('express').Router()
const commentController = require('../controller/commentController');
const { authentication } = require('../middleware/auth');

commentRoute.get('/all', commentController.getCommentAll);
commentRoute.get('/', authentication, commentController.getComment);
commentRoute.post('/add', authentication, commentController.addComment);
commentRoute.get('/:id', commentController.getCommentById);
commentRoute.get('/edit/:id', commentController.editCommentPage);
commentRoute.put('/edit/:id', authentication, commentController.editComment);
commentRoute.delete('/delete/:id', authentication, commentController.deleteComment);


module.exports = commentRoute;