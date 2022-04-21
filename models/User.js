const mongoose = require("mongoose");
//
const definedSchema = {
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phrase: {
        type: String,
        required: true
    },
    urole: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: String,
        required: true
    },
    storeid: {
        type: String,
    },
    member_storeid: {
        type: String,
    },
    refered_by: {
        type: String
    }
};
//
const userSchema = new mongoose.Schema(definedSchema);
//
const User = mongoose.model("User", userSchema);
//
module.exports = User;