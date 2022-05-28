const express = require("express");
const router = express.Router();
const authenticate = require("../../../middleware/isauth");
const {ROUTE_SHOP_GENERAL, ROUTE_SHOP_BASIC_DESIGN} = require("../../../lib/user-routes");
const UserController = require("../../../controllers/UserController");
const userController = new UserController();
const fileware = require("../../../middleware/fileware");

//
router.get(ROUTE_SHOP_GENERAL, authenticate, (req, res) => {
    //
    return userController.shopSettings(req, res);
});

//////////[][[[[[[[[[]]]]]]]]]POST
router.post(ROUTE_SHOP_GENERAL, authenticate, (req, res) => {
    //
    return userController.shopSettings(req, res);
});
////
router.get(ROUTE_SHOP_BASIC_DESIGN, authenticate, (req, res) => {
    //
    return userController.basicDesignSettings(req, res);
});

router.post("/shop/uploader", [authenticate, fileware.single("logo")], (req, res) => {
    //
    return userController.logoUploader(req, res);
});

module.exports = router;