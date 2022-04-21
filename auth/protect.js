
//


//
const protectRout = (req, res, next) => {
    if(req.isAuthenticated()){
        //
        return next();
    }
    console.log("Please login to continue...");
    //
    res.redirect("/login");
}
//
const allowIf = (req, res, next) => {
    //
    if(!req.isAuthenticated()){
        return next();
    }
    //
    res.redirect("/dashboard");
}

module.exports = {
    protectRout,
    allowIf
};