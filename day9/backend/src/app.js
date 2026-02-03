const express = require('express')
const noteModel = require('./model/note.model')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.post('/api/notes', async(req, res)=>{
    const{title, description, color} = req.body
    const note = await noteModel.create({
        title, description, color
    })

    res.status(201).json({
        message:'Note Created',
        note
    })

})

app.get('/api/notes', async(req, res)=>{
    const notes = await noteModel.find()
    res.status(200).json(
        {message : "Note Fetchd",
        notes}
    )
})



app.delete('/api/note/:id', async(req, res)=>{
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message: " note delete"
    })
})

app.patch('/api/note/:id', async(req, res)=>{
    const id = req.params.id
    const {title, description} = req.body
    await noteModel.findByIdAndUpdate(id, {title, description})
    

    res.status(201).json({
        message:"updated"
    }) 
})

app.get('*name', (req, res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app