const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = (db) => db.model("role", RoleSchema);

