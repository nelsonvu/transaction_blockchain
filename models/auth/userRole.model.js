const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: "Role",
    }
})

module.exports = (db) => db.model("user-role", UserRoleSchema);
