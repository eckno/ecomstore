const express = require('express');
const { protectRoute } = require("../auth/protect");
const LoginController  = require("../controllers/loginController");
const loginController = new LoginController();
const {
    ROUTE_HOME,
    ROUTE_ABOUT,
    ROUTE_CONTACT,
    ROUTE_MARKET,
    ROUTE_CART,
    ROUTE_CHECKOUT,
    ROUTE_NEW_ARRIVALS,
    ROUTE_PRODUCT_DETAILS,
    ROUTE_WISHLIST,
    ROUTE_FORGOT_PASSWORD,
    ROUTE_LOGIN,
    ROUTE_REGISTER,
} = require("../lib/index-routes");

const router = express.Router();

//
router.get(ROUTE_HOME, async (req, res) => {
    res.render("index", {title: 'home page'});
});

router.get(ROUTE_LOGIN, async (req, res) => {
    return await loginController.loginView(req, res);
})

router.get(ROUTE_REGISTER, async (req, res) => {
    return await loginController.registerView(req, res);
})

router.get(ROUTE_FORGOT_PASSWORD, async (req, res) => {
    res.render("pages/forgot_password", {title: "Retrieve Password"})
})


/////////INDEX POST REQUEST PAGES
//[]{==}
router.post("/login", async (req, res) => {
    //
    return await loginController.loginUser(req, res);
});

router.post("/register", async (req, res) => {
    //
    return await loginController.registerUser(req, res);
})

module.exports = router;