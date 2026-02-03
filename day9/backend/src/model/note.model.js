const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title:String,
    description:String,
    color:{
        r:Number,
        g:Number,
        b:Number
    }
})

const noteModel = mongoose.model('notes', noteSchema)

module.exports = noteModel