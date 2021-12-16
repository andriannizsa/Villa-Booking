const router = require("express").Router();
const stripeRoute = require('./stripeRoutes')
router.use("/stripe", stripeRoute);

const userRoute = require("./user");
router.use("/users", userRoute);

// const imageRoute = require("./image");
// router.use("/images", imageRoute);

const villaRoute = require("./villa");
router.use("/villas", villaRoute);

const commentRoute = require("./comment");
router.use("/comments", commentRoute);

const cartRoute = require("./cart");
router.use("/carts", cartRoute);

const lineItemRoute = require("./lineItem");
router.use("/items", lineItemRoute);

const orderRoute = require("./order");
router.use("/orders", orderRoute);



module.exports = router;