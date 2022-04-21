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
                footer_scripts: ["/assets/app/validations/users/shop_settings.js"]
            });
        }
    }
}

//
module.exports = userController;