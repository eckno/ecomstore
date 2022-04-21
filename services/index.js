const User = require("../models/User");
const _ = require("lodash");
const {empty, filter_var, isString} = require("../lib/utils/utils");
const { v4: uuidv4 } = require('uuid');
const {UROLE_ADMIN, UROLE_CUSTOMER, UROLE_GLOBAL_ADMIN, UROLE_MEMBER, GLOBAL_SEC } = require("../lib/constants");
const BaseService = require("./base");
const jwt = require("jsonwebtoken");
const {LocalStorage} = require("node-localstorage");


class IndexServices extends BaseService
{
    constructor(){
        super();
    }

    async registrationService(req)
    {
        try{
            //
            if(req.body && !empty(req.body)){
                //
                let data = {};
                //
                const post = BaseService.sanitizeRequestData(req.body);
                //
               if(empty(post['email']) || empty(post['fullname']) || empty(post['phone']) || empty(post['password'])){
                   //
                   data = {
                       success: false,
                       message: "Kindly fill all required fields!"
                   }
                   //
                   return IndexServices.sendFailedResponse(data);
                   //
               }else if(post["password"] !== post["password_t"] ){
                   //
                   data = {
                    success: false,
                    message: "Invalid password format !!"
                }
                //
                return IndexServices.sendFailedResponse(data);
               }else if(!filter_var(_.trim(post["email"]), "FILTER_VALIDATE_EMAIL") || !isString(post["email"])){
                //
                data = {
                    success: false,
                    message: "Please enter a valid email address"
                }
                //
                return IndexServices.sendFailedResponse(data);
                }
    
               ///if everything looks good => check if user exist
               const bserv = new BaseService();
               const returnedResult = await bserv.checkUserByEmail(User, post['email']);
               //
               if(!empty(returnedResult && returnedResult['success'] === true)){
                   //
                   data = {
                    success: false,
                    message: "Your email address is invalid or already exists."
                }
                //
                return IndexServices.sendFailedResponse(data);
                //
               }else if(!empty(returnedResult) && returnedResult['success'] === false){
                   //return BaseService.sendSuccessResponse(returnedResult['success']);
                   const userData = {
                    fullname: post['fullname'],
                    email: post['email'],
                    phrase: post['password'],
                    phone: post['phone'],
                    urole: UROLE_MEMBER,
                    storeid: uuidv4(),
                    member_storeid: "",
                    refered_by: ""
                }
                const newUser = new User(userData);
                //
                const hashUser = await bserv.hashPassword(newUser.phrase);
                if(!empty(hashUser)){
                    //
                newUser.phrase = hashUser;
                const registerUser = await bserv.saveUser(newUser);
                return IndexServices.sendSuccessResponse(registerUser)
                }
                //
               }
               else{
                   //
                   data = {
                    success: false,
                    message: "Sorry, something went wrong while processing your request."
                }
                //
                return IndexServices.sendFailedResponse(data);
               }
               
            }else{
                return IndexService.sendFailedResponse("An error occurred. Please check your request and try again");
            }
        }
        catch (e) {
            //
            return IndexService.sendFailedResponse("Could not process your request. Please check your request and try again");
        }
        //
    }

    //
    async loginService(req)
    {
        //
       try{
        if(req.body && !empty(req.body))
        {
            const post = BaseService.sanitizeRequestData(req.body);
            //
            if(empty(post['email']) || empty(post['auth'])){
                return BaseService.sendFailedResponse({
                    success: false,
                    message: "Kindly provide your email and password."
                })
            }
            else if(!filter_var(_.trim(post["email"]), "FILTER_VALIDATE_EMAIL") || !isString(post["email"])){
                //
                return IndexServices.sendFailedResponse({
                    success: false,
                    message: "Please enter a valid email address"
                });
            }
            //
            const bserv = new BaseService();
            //
               const returnedResult = await bserv.checkUserByEmail(User, post['email']);
               //
               if(empty(returnedResult) || returnedResult['success'] === false){
                   //
                return IndexServices.sendFailedResponse(data = {
                    success: false,
                    message: "Incorrect email address or password"
                    });
                //
               }
               //if email is found, let's wright done
               const verifypass = await bserv.verifyUserPassword(post['auth'], returnedResult["data"].phrase);
               //
               if(verifypass === true){
                   //
                   const token = await jwt.sign({
                       id: returnedResult['data']._id,
                       storeid: returnedResult['data'].storeid,
                       role: returnedResult['data'].urole,
                       loggedin: true
                   }, GLOBAL_SEC)
                   //
                   const localStorage = new LocalStorage("./page1");
                   localStorage.setItem("token", token);
                   //
                   return IndexServices.sendSuccessResponse({
                       success: true,
                       data: token
                   })
               }
               else
               {
                   //
                   return IndexServices.sendFailedResponse({
                    success: false,
                    message: "Incorrect email address or password"
                    });
               }
        }
       }
       catch (e) {
        return IndexService.sendFailedResponse("Could not process your request. Please check your request and try again");
       }
    }
}

module.exports = IndexServices;