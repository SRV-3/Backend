const postModel = require('../model/post.model')
const likeModel = require('../model/like.model')
const ImageKit = require('@imagekit/nodejs')
const {toFile} = require('@imagekit/nodejs')


const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
    
    const {caption} = req.body

    
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: req.file.fieldname,
        folder: "cohort-2-insta-posts"
    })

    const post = await postModel.create({
        caption:caption,
        img_url: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message:"post crreated successfully",
        post
    })
}

async function getPostController(req, res) {
    

    const userId = req.user.id
    const posts = await postModel.find({
        user:userId
    })

    res.status(200).json({
        message:"post fetched",
        posts
    })
}

async function getPostDetailsController(req, res) {
    

    const userId = req.user.id
    const postId = req.params.postId

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

async function likePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.find({postId})

    if(!post){
        return res.status(404).json({
            message: "Post not Found"
        })
    }

    const like = await likeModel.create({
        post:postId,
        user: username
    })

    res.status(201).json({
        message:"You liked a post",
        like
    })

}

module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}