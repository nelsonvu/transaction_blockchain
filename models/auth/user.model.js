const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {   
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    fcmToken: {
        type: String
    },
    wallet: {
        address: {
            type: String
        },
        privateKey: {
            type: String
        }
    }
})

module.exports = (db) => {
    if (db?.models?.user) {
        return db.models.user;
    } else {
        return mongoose.model("users", UserSchema);
    }
}