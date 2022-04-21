const BaseService = require("./base");
const bserv = new BaseService();
const shopSettingModel = require("../models/ShopSettings");
const { empty } = require("../lib/utils/utils");



class userService extends BaseService
{
    constructor(){
        super();
    }

    //
    async shopSettingService(req)
    {
        if(req.method === "POST")
        {
            try{
                //
                if(req.body && !empty(req.body)){
                    //
                    const post = BaseService.sanitizeRequestData(req.body);
                    //findStore
                    const hasStore = await bserv.FindStore(shopSettingModel, req);
                    if(!hasStore || hasStore === false){
                        //
                        const storeItems = {
                            storeid: req.getUser['storeid'],
                            ownerid: req.getUser['id'],
                            business_name: post['bname'],
                            slogan: post['bslogan'],
                            email: post['bemail'],
                            contact_number: post['bnumber'],
                            contact_address: post['baddress'],
                            description: post['bdescription'],
                            socials: [post['socialfb'], post['socialinsta'], post['socialtwit']]
                        }
                        //
                        const storeSetting = new shopSettingModel(storeItems);
                        const result = await storeSetting.save().then((result) => {return result});
                        if(!empty(result) && !empty(result['storeid']))
                        {
                            return BaseService.sendSuccessResponse(result);
                        }else{
                            return BaseService.sendFailedResponse({
                                error: "Oops! we could not save your data now, please try again later"
                            });
                        }
                    }
                    else
                    {
                        if(!empty(hasStore) && !empty(hasStore['storeid'])){
                            //
                            const storeItems = {
                                storeid: req.getUser['storeid'],
                                ownerid: req.getUser['id'],
                                business_name: post['bname'],
                                slogan: post['bslogan'],
                                email: post['bemail'],
                                contact_number: post['bnumber'],
                                contact_address: post['baddress'],
                                description: post['bdescription'],
                                socials: [post['socialfb'], post['socialinsta'], post['socialtwit']]
                            }
                            //
                            Object.assign(hasStore, storeItems);
                            const result = await hasStore.save().then((result) => {return result});
                            if(!empty(result) && !empty(result['storeid']))
                            {
                                return BaseService.sendSuccessResponse(result);
                            }else{
                                return BaseService.sendFailedResponse({
                                    error: "Oops! we could not save your data now, please try again later"
                                });
                            }
                        }
                        else
                        {
                            return BaseService.sendFailedResponse({
                                error: "Oops! we could not save your data now, please try again later"
                            });
                        }
                    }
                }
            }
            catch (e) {
                //
                return BaseService.sendFailedResponse({
                    error: "Oops! we could not save your data now, please try again later"
                });
            }
        }
        else
        {
            //
            const findStore = await bserv.FindStore(shopSettingModel, req);
            if(!findStore || findStore === false)
            {
                return BaseService.sendFailedResponse();
            }
            else
            {
                return BaseService.sendSuccessResponse(findStore);
            }
        }
    }
}


module.exports = userService;