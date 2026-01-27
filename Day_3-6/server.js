const app = require("./src/app.js")
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://srv:srvsrvsrv@cluster0.6f8icpg.mongodb.net/day-6")
    .then(()=>{
        console.log("connected to Database")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log(" server is running on 3000");
    
})