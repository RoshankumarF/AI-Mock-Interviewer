import mongoose from "mongoose"

//const 

DB_NAME ="AI-INTERVIEWE-AGENT"

const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        console.log("MongoDB connected successfully")
        
    } catch (error) {
        console.log("MongoDb connection failed",error)

        process.exit(1)
        
    }
}

export {connectDB}