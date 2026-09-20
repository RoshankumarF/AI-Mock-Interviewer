import mongoose ,{Schema} from "mongoose";


const sessionSchema=new Schema({
    userId:{
        tyepe:Schema.Types.ObjectId,
        ref:"User"
    },
    topic :{
        type:String,
        required :true
    },
    difficulty :{
        type:String
    },
    history:[
        {
           
            question: String,
            userAnswer: String,
            feedback: String,
            score: Number 
        }
    ],
    totalScore:{
        type:Number
    },
    status:{
        type:String,
        enum:["ongoing","completed"],
        default:"ongoing"
    }
    

},{timestamps:true})

export const Session = mongoose.model("Session",sessionSchema)