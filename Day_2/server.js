const express = require('express')

const app = express() // server instance create karna

app.get('/', (req, res)=>{
    res.send("I'am SRV")
})

app.get('/about', (req, res)=>{
    res.send('I am from shimla')
})

app.listen(3000) //server start

