const UserServices = require("../services/user");
const BaseController = require("./BaseController");
const userService = new UserServices();

//
class userController extends BaseController
{
    constructor(){
        super();
    }

    async dashboardView(req, res)
    {
        try{
            const {data, success} = await userService.shopSettingService(req);
            //
            if(success === true){
                res.render("user/index", {
                    title: data.business_name,
                    user: data
                });
            }else{
                res.render("user/index", {
                    title: 'Ecomstores Dashboard'
                });
            }
        }
        catch(e)
        {
            res.redirect("/dashboard");
        }
        //
       
    }

    async shopSettings(req, res)
    {
        //
        if(req.method === "POST")
        {
            try{
                 //
                const {data, success} = await userService.shopSettingService(req);
                if(success === true){
                    return BaseController.sendSuccessResponse(res, {
                        response: data,
                        success: true
                    });
                }
                else
                {
                    return BaseController.sendFailResponse(res, {
                        error: data,
                        success: false
                    });
                }
            }
            catch (e){
                //
                return BaseController.sendFailResponse({
                    error: "Oops! we could not save your data now, please try again later"
                })
            }
        }
        else
        {
            //
            const {data, success} = await userService.shopSettingService(req);
           
            res.render("user/pages/settings/index", {
                title: "new age",
                user: data,
                footer_scripts: ["/assets/app/validations/users/shop_settings.js"]
            });
        }
    }

    async logoUploader(req, res)
    {
        if(req.method == "POST"){
            try {
                const {data, success} = await userService.logoUploadService(req);
            //
            if(success === true){
                return BaseController.sendSuccessResponse(res, {
                    response: data,
                    success: true
                });
            }else{
                return BaseController.sendFailResponse(res, {
                    error: data,
                    success: "false"
                });
            }
            }
            catch(e) 
            {
                return BaseController.sendFailResponse(req, {
                    error: "Oops! something went wrong, please contact support for help",
                    success: false
                })
            }
            
        }
    }
    //
    async basicDesignSettings(req, res)
    {
        res.render("user/pages/settings/basic_design", {
            title: "Store Design",
            footer_scripts: ["/assets/app/validations/users/shop_settings.js"]
        });
    }
}

//
module.exports = userController;