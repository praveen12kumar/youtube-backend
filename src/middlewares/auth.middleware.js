// check if user exist or not
import  jwt  from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.models.js"
const isAuthenticatedUser = async(req, res, next) =>{
        try {
            const token = req.cookies?.accessToken || 
            req.header("Authorization")?.replace("Bearer ", "")
    
            if(!token){
                throw new ApiError(401, "Unauthorized request")
            }
    
            const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
            if(!user){
                throw new ApiError(401, "Invalid Token")
            }
    
            req.user = user;
            next();
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid Token access")   
        }
}

export { isAuthenticatedUser};