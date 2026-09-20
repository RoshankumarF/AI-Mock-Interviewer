import mongoose ,{Schema} from "mongoose";


const sessionSchema=new Schema( {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    topic: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
    },
    role: {
      type: String,
    },
    currentQuestion: {
      type: String,      
    },
    history: [
      {
        question: String,
        userAnswer: String,
        strengths: [String],
        missing: [String],
        idealAnswer: String,
        score: Number,
      },
    ],
    totalScore: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },{timestamps:true})

export const Session = mongoose.model("Session",sessionSchema)