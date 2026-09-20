import mongoose from "mongoose";
import { Session } from "../models/session.model.js";
import {apiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { model } from "../gemini.js";

const startInterview =asyncHandler(async(req,res)=>{
    const {topic,difficulty,role}=req.body
    
    const session= await Session.create(
    {
        userId:req.user._id,
        topic:topic,
        difficulty:difficulty,
        role:role
    }
    )
    if(!session){
        throw new apiError(500,"Session could not be created")
    }
 
      const prompt = `
        Ask a ${difficulty} level interview question about ${topic}.
        The candidate is a ${role} .
         Ask only ONE question. Do not provide hints or the answer.
`

 const question = await model.generateContent(prompt);
  const text = result.response.text();
  
  res.json({ response: text });


})

const submitAnswer=asyncHandler(async(req,res)=>{
    const {sessionId}=req.params
    const {answer}=req.body
    if(!mongoose.Types.ObjectId.isValid(sessionId)){
        throw new apiError(400,"invalid session id")
    }

    const session =await Session.findById(sessionId)

    const prompt = `
  Review this answer to the question: "${session.question}"
  
  Candidate's answer: "${answer}"
  
  Provide feedback in this exact structure:
  - What they got RIGHT (be specific)
  - What they MISSED (be specific)  
  - Score out of 10
  - The ideal complete answer


  IMPORTANT: Respond ONLY in this JSON format, no extra text:
  {
    "score": 7,
    "strengths": ["understood the concept", "good example"],
    "missing": ["didn't mention edge cases"],
    "idealAnswer": "..."
  }


`

const result = await  model.generateContent(prompt)
const text = result.response.text()

return res.json({response:text})

})