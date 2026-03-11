const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        unique: [true, "User name already exists"],
        required:[true, "User name is required"]
    },
    email:{
        type: String,
        unique: [true, "User email already exists"],
        required:[true, "Email is required"]
    },
    password:{
        type: String,
        required:[true, "Password is required"],
        select: false
    },
    bio:String,
    profileImage:{
        type: String,
        default: "https://ik.imagekit.io/rf5y8ntes/default-image.jpg?updatedAt=1770738278737"
    }
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel