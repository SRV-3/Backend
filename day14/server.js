require('dotenv').config()
const app = require('./src/app')
const connectToDB = require('./src/config/database')

connectToDB()

app.listen(3000, ()=>{
    console.log('SERVER IS RUNING ON 3000 🔥') 
})