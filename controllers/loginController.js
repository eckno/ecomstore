//
const passport = require("passport");
const BaseController = require("./BaseController");
const {BASE_TITLE} = require("../lib/constants");
const IndexServices = require("../services/index");

//
class loginController extends BaseController {
    constructor(){
        super();
        this.mail_api ="";
    }

    async registerView(req, res){
        //
        res.render("pages/register", {
            title: BASE_TITLE + " | Account Registration",
            footer_scripts: ["/assets/app/validations/regval.js"]
        });
    }

    //
    async registerUser(req, res){
       try{
        
        if(req.method ==="POST"){
            //
           
            const indexServices = new IndexServices();
            const {data, success} = await indexServices.registrationService(req);
            //
            if(success === false){
                return loginController.sendFailResponse(res, data);
            }
            //
            return loginController.sendSuccessResponse(res, data);
        }
      
       }
       catch (e){
        return loginController.sendFailResponse(res, "An error occurred. Please check your request and try again");
       }
    }

    async loginView(req, res){
        //
        res.render("pages/login", {
            title: BASE_TITLE + " | Account Login",
            footer_scripts: ["/assets/app/validations/loginval.js"]
        });
    }

    //
    async loginUser(req, res){
        //
        try{
            if(req.method === "POST"){
                //
                const indexServices = new IndexServices();
                    const {data, success} = await indexServices.loginService(req);
                    //
                    if(success === false){
                        return loginController.sendFailResponse(res, data);
                    }
                    //
                    return loginController.sendSuccessResponse(res, data);
            }
            
        }
        catch (e){
            return loginController.sendFailResponse(res, "An error occurred. Please check your request and try again");
        }
            //
            // passport.authenticate("local", {
            //     successRedirect: "/dashboard",
            //     failureRedirect: "/login",
            //     failureFlash: true
            // })(req, res);
    
    }
}
//

//
module.exports = loginController;