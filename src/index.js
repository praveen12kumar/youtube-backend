import app from "./app.js"
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path:"src/config/config.env",
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server started listening on ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("mongoDB connection error: " + err)
})
