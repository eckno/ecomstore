//
const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
//
const User = require("../models/User");
//
const loginCheck = passport => {
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, phrase, done) => {
            User.findOne({email: email})
            .then((user) => {
                if(!user){
                    console.log("wrong email");
                    return done();
                }
                //
                bcrypt.compare(phrase, user.phrase, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch){
                        return done(null, user);
                    }else{
                        //
                        console.log("wrong password!!");
                        return done();
                    }
                })
            })
            .catch((error) => console.log(error));
        })
    );

    //
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    //
    passport.deserializeUser((id, done) => {
        User.findById(id, (error, user) => {
            done(error, user);
        });
    });
}

//
module.exports = {
    loginCheck,
};