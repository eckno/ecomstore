const express = require("express");
const router = express.Router();
const authenticate = require("../../../middleware/isauth");
const {ROUTE_SHOP_GENERAL} = require("../../../lib/user-routes");
const UserController = require("../../../controllers/UserController");
const userController = new UserController();

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

module.exports = router;