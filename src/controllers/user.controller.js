import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { updloadOnCloudinary } from "../utils/cloundinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async(req, res)=>{
    // get user details from frontend
    // validation -not empty
    // check if user is already registered (email)
    // check for images and avatar
    // upload them to cloudinary
    // check avatar upload on cloudinary
    // create user object 
    // remove the password and refresh token field from responose
    // check user creation
    // return res
    const {fullname, email, password, username} = req.body;
    if([fullname, email, password, username].some((field)=>
        field?.trim() === "")
      ){
        throw new ApiError(400, "All fields are required")
      }

      const user = await User.findOne({
        $or:[{email}, {username}]
      });
      if(user){
        throw new ApiError(409, "User already exists")
      }
      // multer gives you access to req files
      const avatarLocalPath = req.files?.avatar[0]?.path;
      const coverLocalPath = req.files?.coverImage[0]?.path;

      if(!avatarLocalPath){
        throw new ApiError(400, "Avatar not found")
      }

      const avatar = await updloadOnCloudinary(avatarLocalPath)
      const coverImage = await updloadOnCloudinary(coverLocalPath)

      if(!avatar){
        throw new ApiError(400, "Avatar not uploaded")
      }

      const newUser = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email, 
        password,
        username: username.toLowerCase(),
      })

      const createdUser = await User.findById(newUser._id).select(
        "-password -refeshToken"
      ) 

      if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering user")
      }

      return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
      )
})




export {
    registerUser,
    
}