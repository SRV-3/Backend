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

async function getPostController(req, res) {
    const token = req.cookies.token

    if(!tooken){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    let decoded = null

    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message: " token not valid"
        })
    }

    const userId = decoded.id
    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"post fetched",
        posts
    })
}

async function getPostDetailsController(req, res) {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    let decoded = null
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    const userId = decoded.id
    const postId = req.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }

    const isValidUser = post.user.toString() === userId

    if (!isValidUser){
        return res.status(403).json({
            message:"Forbidden Content"
        })
    }

    return res.status(200).json({
        message:"post fetched",
        post
    })
}


module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController
}