import User from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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

    res.status(201).json({
        message: "Ok"
    })
})


export {
    registerUser,
    
}