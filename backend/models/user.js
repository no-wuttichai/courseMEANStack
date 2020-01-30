const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    role: { type: String, default: 'Cashier', enum: ['Admin', 'Cashier'] },
})

module.exports = mongoose.model("User", schema)