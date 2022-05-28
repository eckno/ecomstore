const express = require('express');
const {
    ROUTE_DASHBOARD,
} = require("../../lib/user-routes");
const authenticate = require("../../middleware/isauth");
const UserController = require("../../controllers/UserController");
const userController = new UserController();

const router = express.Router();

//
router.get(ROUTE_DASHBOARD, authenticate, async (req, res) => {
    // passport.authenticate("local", (error, user, info) => {
    //     if(error) {
    //         const data = {success: false, msg: error}
    //         return res.status(500).json(data);
    //     }
    //     if(!user) {
    //         const data = {success: false, msg: info.message}
    //         return res.status(401).json(data);
    //     }
    //     console.log("UserItem ", user);
    //     req.logIn(user, function(err) {
    //         if (err) { return next(err); }
    //         const data = {success: true, data: user, redirectURL: "/dashboard"}
    //         return res.json(data);
    //         //return res.redirect('/users/' + user.username);
    //       });
        
    // })(req, res, next);
    return  userController.dashboardView(req, res);
});


/////////INDEX POST REQUEST PAGES
//[]{==}


module.exports = router;