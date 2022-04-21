const _ = require('lodash');
const bcrypt = require("bcryptjs");
const {empty, isObject, isString} = require("../lib/utils/utils");

class BaseService {
    constructor()
    {
        
    }

    	/**
	 *
	 * @param {*} data
	 * @returns
	 */
	static sanitizeRequestData(data) {
		if (!empty(data)) {
			_.forEach(data, (d, key) => {
				data[key] = this.recursivelySanitize(d);
			});
		}
		return data;
	}

    /**
	 *
	 * @param {*} data
	 * @returns
	 */
	static recursivelySanitize(data) {
		if (isObject(data)) {
			_.forEach(data, (d, key) => {
				if (_.isString(d) && _.includes(d, "%") !== false) {
					data[key] = decodeURI(d);
				}
				if (isObject(d)) {
					data[key] = this.recursivelySanitize(d);
				}
			});
		} else if (_.isString(data)) {
			data = data.trim();
		}
		return data;
	}

    /**
	 * uniform expectation of failed response data
	 * @param data
	 * @return mixed
	 */
	static sendFailedResponse(data) {
		const returnData = { success: false };
		if (!empty(data) || data === "0" || data === 0 || data === "") {
			returnData['data'] = data;
		}
		return returnData;
	}

	/**
	 * uniform expectation of successful response data
	 * @param data
	 * @return mixed
	 */
	static sendSuccessResponse(data) {
		const returnData = { success: true };
		if (!empty(data) || data === 0 || data === "0" || data === "") {
			returnData['data'] = data;
		}
		return returnData;
	}

    /**
	 * checking if a user exists by email, returns true || false
	 * @param data
	 * @return mixed
	 */
    async checkUserByEmail(req, userEmail){
        //
        try{
            //
            const receivedResp = await req.findOne({email: userEmail})
        .then((result) => {
            if(result && !empty(result)){

                const data ={
                    success: true,
                    data: result
                }
                //
                return data;
            }else{
                const data ={
                    success: false,
                    data: ""
                }
                //
                return data;
            }
        })
        .catch((err) => {
            return err;
        })

        //
        return receivedResp;
        }
        catch (e){
            //
            return "Oops! We can't process your request at this time, please try again later";
        }
        
    }

    //
    async saveUser(userDetails)
    {
        try{
            //
            if(!empty(userDetails)){
                //
                const save_user = await userDetails.save()
                .then(() => {
                    //
                    const data = {
                        success: true,
                        message: "You have successfully created your account. Login to continue"
                    }
                    //
                    return data;
                }).catch((err) => {
                    //
                    return err;
                })
    
                //
                return save_user;
            }else{
                //
                const data = {
                    success: false,
                    message: "Empty user: no user entry parsed"
                }
                //
                return data;
            }
        }
        catch (e) {
            //
            return "Oops! We can't process your request at this time, please try again later";
        }
    }

    //
    async hashPassword (pass) {
        //
        try{
            //
            if(!empty(pass)){
                //
                const password = pass;
                const saltRounds = 10;
          
                const hashedPassword = await new Promise((resolve, reject) => {
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        if (err) reject(err)
                        resolve(hash)
                    });
                 })
          
                return hashedPassword;
            }
        }
        catch (e) {
            //
            return "Oops! We can't process your request at this time, please try again later";
        }
      }

    async verifyUserPassword(pass, user_db_pass)
      {
          //
          try{
            const result = await bcrypt.compare(pass, user_db_pass);
            //
            return result;
          }
          catch (e){
            return "Oops! We can't process your request at this time, please try again later";
          }
      }

    async FindStore(model, req)
    {
        const findStore = await model.findOne({storeid: req.getUser['storeid']}).then((result) => {if(result) return result; else return false;});

        //
        return findStore;
    }
}

module.exports = BaseService;