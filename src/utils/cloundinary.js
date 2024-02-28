import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});



const updloadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        // upload the file to the cloudinary
       const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })

        // file has been successfully uploaded
        console.log("file successfully uploaded on cloudinary", response.url)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)// remove temporary saved file as the upload failed
        return null
    }
}


export {updloadOnCloudinary}