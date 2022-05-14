const mongoose = require("mongoose");

//
const Schema = {
    storeid: {
        type: String,
        required: true
    },
    ownerid: {
        type: String,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    slogan: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    contact_number: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    lga: {
        type: String
    },
    contact_address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    socials: {
        type: Array
    },
    logoUrl: {
        type: String,
    }
}

const shopSchema = new mongoose.Schema(Schema);
const shopSettingModel = mongoose.model("shopSettings", shopSchema);

//
module.exports = shopSettingModel;