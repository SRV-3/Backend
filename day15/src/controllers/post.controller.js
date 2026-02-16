const postModel = require('../model/post.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')
const jwt = require('jsonwebtoken')

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    
    const {caption} = req.body

    const token = req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"Token not provided unauthorized access"
        })
    }

    let decoded = null

    try{
         decoded = jwt.verify(token, process.env.JWT_SECRET)
    }catch(err){
        res.status(401).json({
            message:"user not authorized"
        })
    }
    

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: req.file.fieldname,
        folder: "cohort-2-insta-posts"
    })

    const post = await postModel.create({
        caption:caption,
        img_url: file.url,
        user: decoded.id
    })

    res.status(201).json({
        message:"post crreated successfully",
        post
    })
}

module.exports = {
    createPostController
}