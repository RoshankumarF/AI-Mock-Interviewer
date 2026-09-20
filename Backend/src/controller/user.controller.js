import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"


const register=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body

    if(!(username || email ||password)){
        throw new apiError(400,"all fields are required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(userexist){
        throw new apiError(409,"user already exists")
    }

    const user= await User.create(
        {
            username,
            email,
            password
        }
    )

    if(!user){
        throw new apiError(500,"something went wrong while registering user")
    }

    res.json({response:user})
})

const login=asyncHandler(async(req,res)=>{

})

const logout=asyncHandler(async(req,res)=>{

})