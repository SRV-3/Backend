const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    img_url:{
        type:String,
        required:[true,"img_url is required for creating an post"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"User id is required for creating an posts"]
    }
})

const postModel = mongoose.model('posts', postSchema)

module.exports = postModel