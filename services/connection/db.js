const mongoose = require("mongoose");
const dotenv = require("dotenv");

//
class connection {
    //
    constructor(){
       // super();
    }

    //
    async connectDb()
    {
        //SETUP DBS
        dotenv.config();
        //
        const dbs = process.env.MONGOLAB_URI;
        await mongoose.connect(dbs, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(async () => console.log("DB connection successful"))
        .catch((error) => console.log(error)); 
    }
}

module.exports = connection;