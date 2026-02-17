const mongoose = require('mongoose')

const followSchema = new mongoose.Schema({
    follower:{
        type:mongoose.schema.Types.ObjectId,
        ref: "users",
        required:[true, "Follower is required"]
    },
    folowee:{
        type:mongoose.schema.Types.ObjectId,
        ref: "users",
        required:[true, "Followee is required"]
    }
},{
    Timestamp: true
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel