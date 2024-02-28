import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: 'db8gwurbh',
    api_key: '588133775623143',
    api_secret: 'KJ6goVWy0I8JyeiQYL0rOUUNwDA'
  });
  


const uploadOnCloudinary = async (localFilePath) => {
   
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary

     

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        //console.error("Error uploading to Cloudinary:", error);
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}