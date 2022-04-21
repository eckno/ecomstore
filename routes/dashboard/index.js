const express = require('express');
const {
    ROUTE_DASHBOARD,
} = require("../../lib/user-routes");
const authenticate = require("../../middleware/isauth");

const router = express.Router();

//
router.get(ROUTE_DASHBOARD, authenticate, async (req, res) => {
    res.render("user/index", {title: 'Business Name'});
});


/////////INDEX POST REQUEST PAGES
//[]{==}


module.exports = router;