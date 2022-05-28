const BaseService = require("./base");
const bserv = new BaseService();
const shopSettingModel = require("../models/ShopSettings");
const { empty } = require("../lib/utils/utils");
const multer  = require('multer');
const resizer = require("../lib/resizer");
const path = require("path");
const rimraf = require("rimraf");
const fs = require("fs");



class userService extends BaseService
{
    constructor(){
        super();
    }

    //
    async logoUploadService(req)
    {
        try {
            
            const uploadPath = path.join(__dirname, '../public/uploads/' + req.getUser.storeid + '/logo/');
        //
        rimraf.sync(uploadPath);
        const upload = multer({dest: './public/uploads/' + req.getUser.storeid + '/logo/'});
        const logoUpload = new resizer(uploadPath);
        upload.single('logo');
        const filename = await logoUpload.save(req.file.buffer);
        
        if(filename && !empty(filename)){
            //
            const updateStore = {
                logoUrl: filename
            };
            //
            const getShop = await shopSettingModel.findOne({storeid: req.getUser.storeid});
            if(getShop && !empty(getShop)){
                if(getShop.storeid === req.getUser.storeid && getShop.ownerid === req.getUser.id)
                {
                    const resp = await shopSettingModel.findByIdAndUpdate(getShop._id, updateStore);
    
                    if(!empty(resp) && !empty(resp.storeid))
                    {
                        return userService.sendSuccessResponse("Account successfuly updated");
                    }
                }
                else
                {
                    return userService.sendFailedResponse("Oops! we could not update your data now, please try again later");
                }
            }else{
                return userService.sendFailedResponse("Oops! we could not update your data now, please try again later");
            }
            
        }else{
            return userService.sendFailedResponse("Oops! we could not update your data now, please try again later");
        }
        }
        catch(e)
        {
            return BaseService.sendFailedResponse("Error: could not upload your logo at this time. Please contact support if problem persist.");
        }
        if(!req.file || empty(req.file)){
            //
            return userService.sendFailedResponse("Error: no logo file selected for upload");
        }
    }

    async shopSettingService(req)
    {
        if(req.method === "POST")
        {
            try{
                //
                if(req.body && !empty(req.body)){
                    //
                    const post = userService.sanitizeRequestData(req.body);
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
                            return userService.sendSuccessResponse(result);
                        }else{
                            return userService.sendFailedResponse({
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