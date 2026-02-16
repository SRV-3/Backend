const userModel = require('../model/user.model')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

async function registerController  (req, res){
    const{username, email, password, bio, profileImage} = req.body
    console.log(username)

    // const isUserExistByEmail = await userModel.findOne({email})
    // const isUserExistByUsername = await userModel.findOne({username})

    // if(isUserExistByEmail){
    //     if(isUserExistByUsername){
    //         return res.status(409).json({
    //             message:'user already exist by username'
    //         })
    //     }
    //     return res.status(409).json({
    //         message:'user already exist by email'
    //     })
    // }

    // if(isUserExistByUsername){
    //     return res.status(409).json({
    //         message:'user already exist by username'
    //     })
    // }

    const isUserExist = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserExist){
        return res.status(409).json({
            message:"User already esists " + (isUserExist.email == email
        ? "emailalready esists" : "username already exist")
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })

    const token = jwt.sign({
        id:user._id,
        },process.env.JWT_SECRET
        ,{expiresIn: "1d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message:"User Registered Successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage: user.profileImage
        }
    })

}

async function loginController (req, res){
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {email: email},
            {username: username}
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"User not exist"
        })
    }

    
    const isPasswordMatched = await bcrypt.compare(password, user.password)

    if(!isPasswordMatched){
        return res.status(401).json({
            message:"incorrect password"
        })
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token", token)
    res.status(200).json({
        message:"user logged in successfully",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

}

module.exports = {loginController, registerController}