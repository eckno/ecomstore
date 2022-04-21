//
const {empty} = require("../lib/utils/utils");
const {LocalStorage} = require("node-localstorage");
const jwt = require("jsonwebtoken");
const { ROUTE_LOGIN } = require("../lib/index-routes");
const { GLOBAL_SEC } = require("../lib/constants");

//
const authUser = async (req, res, next) => {
    //
    const localStorage = new LocalStorage("./page1");
    const token = localStorage.getItem("token");
    //
    if(token && !empty(token)){
    //
        const verify = await jwt.verify(token, GLOBAL_SEC);
        //
        if(!empty(verify) && verify['loggedin'] === true){
            req.getUser = verify;
            //
            next();
        }
        else
        {
            res.redirect(ROUTE_LOGIN);
        }

    }
    else
    {
        res.redirect(ROUTE_LOGIN);
    }
}

//
module.exports = authUser;