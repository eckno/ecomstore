
//
class BaseController {

    constructor(){
        this.mail_api ="";
    }

    /**
	 * standard fail response object
	 * @param res
	 * @param data
	 */
	static sendFailResponse(res, errors) {
		res.status(400).send({ success: false, errors });
	}

    	/**
	 * standard success response object
	 * @param res
	 * @param data
	 */
	static sendSuccessResponse(res, data) {
		res.status(201).send({ success: true, data });
	}
    
}

module.exports = BaseController;