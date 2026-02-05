const mongoose = require('mongoose')

const userSchem = new mongoose.Schema({
    name:String,
    email:{
        type: String,
        unique:[true, "email already exist"]
    },
    password:String,
})

const userModel = mongoose.model('users', userSchem)

module.exports = userModel