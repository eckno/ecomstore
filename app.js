const express = require("express");
const liquidjs = require("liquidjs");
const dotenv = require("dotenv");
const passport = require("passport");
const path = require("path");
const adminRoute = require("./routes/admin");
const bodyParser = require("body-parser");
const { loginCheck } = require("./auth/passport");
const mongoose = require("mongoose");
const cors = require("cors");

//
loginCheck(passport);

//Init express && engine
const app = express();

//
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

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
    const PORT = process.env.PORT || 3000;
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
