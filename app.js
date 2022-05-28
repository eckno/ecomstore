const express = require("express");
const liquidjs = require("liquidjs");
const dotenv = require("dotenv");
const path = require("path");
const adminRoute = require("./routes/admin");
const bodyParser = require("body-parser");
const { loginCheck } = require("./auth/passport");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

//Init express && engine
const app = express();

//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/uploads')));
//
//set session
app.use(session({
    secret: "KEYLOGGERhjfdjhfdhjfdh",
    resave: true,
    saveUninitialized: true
}));
//
app.use(passport.initialize());
app.use(passport.session());
app.use(require('flash')());
//Set global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
})

//
const engine = new liquidjs.Liquid();

//Dependecies
app.engine("liquid", engine.express());
app.set('view engine', 'liquid');

//SETUP DBS
dotenv.config();
//
const dbs = process.env.MONGOLAB_URI;
mongoose.connect(dbs, {useUnifiedTopology: true, useNewUrlParser: true})
.then(async () => {
    //
    const PORT = process.env.PORT || 3008;
    app.listen(PORT, console.log("Server running on port " + PORT));
})
.catch((error) => console.log(error)); 
//

//Routes
app.use("/", require("./routes/index"));
app.use("/dashboard", require("./routes/dashboard/index"));
app.use("/dashboard/settings", require("./routes/dashboard/settings/shop"));
app.use("/admin", adminRoute);
//
