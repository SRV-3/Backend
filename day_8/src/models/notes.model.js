const mongoose = require('mongoose')

const noteSchem = new mongoose.Schema({
    title:String,
    description:String
})

const noteModel = mongoose.model('sareNote', noteSchem)

module.exports = noteModel
