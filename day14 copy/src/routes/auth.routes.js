const express = require('express')
const jwt = require('jsonwebtoken')
const authRouter = express.Router()
const userModel = require('../models/users.model')
const crypto = require('crypto')

authRouter.post('/register', async(req, res)=>{
    const {name,email,password} = req.body

    const isUserAlreadyExist = await userModel.findOne({email})

    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"USER WITH THIS MAIL ALREADY EXIST"
        })
    }

    const hash = crypto.createHash('md5').update(password).digest("hex")
    const user = await userModel.create({
        name,email,password:hash
    })

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message:"USER CREATED",
        user,
        token
    })
})

authRouter.post("/protected", (req,res)=>{
    console.log(req.cookies)
    res.status(200).json({
        message:"Protected Route"
    })
})

authRouter.post("/login", async(req, res)=>{
    const {email, password} = req.body

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(401).json({
            message:"user not found"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash('md5').update(password).digest('hex')

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
        email:user.email
    }, process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message:"user logged in",
        user
    })
})

module.exports = authRouter