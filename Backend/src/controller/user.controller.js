import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import { apiResponse } from "../utils/apiResponse.js"



const generateAccessAndRefreshToken=async(userId)=>{

    try {
        const user =await User.findById(userId)
        const accessToken=user.generateAccessToken()
        const refreshToken=user.generateRefreshToken()

        user.refreshToken=refreshToken

        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}
    } catch (error) {
          console.log(error)
        throw new apiError(500,"something went wrong while generating refresh and access Tokens ")
        
    }

}


const register=asyncHandler(async(req,res)=>{
    
    const {username,email,password}=req.body

    if(!(username || email ||password)){
        throw new apiError(400,"all fields are required")
    }

    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
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

    res.status(201).json(new apiResponse(201,user,"User created successfully"))
})

const login=asyncHandler(async(req,res)=>{
     
     const {email,username,password}=req.body
       if(!(username||email)){
        throw new apiError(400,"username or email is required")
    }

     const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new apiError(400,"user does not exist")
    }

    
    const isPasswordValid=await user.isPasswordCorrect(password)

     if(!isPasswordValid){
        throw new apiError(401,"Password is incorect ,try again ")
     }

     const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

       const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

       const options={
        httpOnly:true,
        secure:true,
        sameSite: "none"
       }

       return res
      .status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken)
      .json(new apiResponse(200,{
        user:loggedInUser,
        accessToken,refreshToken
      },
      "user logged in successfully"
    ))

})

const logout=asyncHandler(async(req,res)=>{
    await  User.findByIdAndUpdate(
         req.user._id,
         {
            $unset:{
                refreshToken:1
            }
         },
         {
            new :true
         }
    )
    const options={
        httpOnly :true,
        secure:true,
        sameSite: "none"

      }

      return res
      .status(200)
      .clearCookie("accessToken",options)
      .clearCookie("refreshToken",options)
      .json(new apiResponse(200,{},"user logged out successfully"))
    

})

const getCurrentUser=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id).select("-password");
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
     
        res.status(200).json(new apiResponse(200,user,"user fetched successfully"));
    
})

export {
    register,
    login,
    logout
}