const userController = require("../controller/userController");
const { admin } = require("../middleware/admin");
const { authentication } = require("../middleware/auth");
const { uploads } = require("../middleware/multer");

const userRoute = require("express").Router();

userRoute.get('/', userController.getUser);
userRoute.post('/login', userController.login);
userRoute.post('/register', userController.register);


userRoute.put(
    "/info/avatar",
    uploads.single("image"),
    userController.updateAvatar
  );
userRoute.put('/edit/:id', authentication, uploads.single("avatar"), userController.editUser);
userRoute.delete('/delete/:id', authentication, admin, userController.deleteUser);

userRoute.post("/admin/add", authentication, admin, userController.register);




module.exports = userRoute;