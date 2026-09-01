import mongoose , {Schema}from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userScehma = new Schema({
    name:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        index:true
    },
     email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
    },
    fullName:{
        type: String,
        required:true,
        index:true
    },
      password:{
        type: String,
        required:[true,"Password is required"],
       
    },
    avatar:{
        type:String, //cloudinary url,
        required:true
    },
    coverImage:{
         type:String, //cloudinary url,
        required:true
    },
    watchHistory:{
        type:mongoose.Types.ObjectId,
        ref:"Video"
    }



},{timestamps:true})


userScehma.pre("save",async function (next){
    if(this.isModified("password")  ) return next()
    this.password= bcrypt.hash(this.password, 10)
    next()
})
userScehma.methods.isPasswordCorrected =async function (password) {
  return await  bcrypt.compare(password,this.password)
}


userScehma.methods.genereteAccessToken=  function () {

    jwt.sign({
        _id:this.id,
        email:this.email,
        username:this.name,
        fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiryIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
    
}


userScehma.methods.genereteRefreshToken=  function () {

    jwt.sign({
        _id:this.id,
       
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiryIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
    
}

export const User =mongoose.model("User",userScehma)