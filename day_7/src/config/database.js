require("dotenv").config()
const mongoose = require('mongoose')


const connectToDb = function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("connected to DataBase")
    })
}

module.exports = connectToDb