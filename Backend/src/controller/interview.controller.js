import mongoose from "mongoose";
import { Session } from "../models/session.model.js";
import {apiError} from "../utils/apiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { model } from "../gemini.js";
import generateWithRetry from "../utils/generateWithRetry.js";

const startInterview =asyncHandler(async(req,res)=>{
    const {topic,difficulty,role}=req.body
    
   
  if (!topic || !difficulty || !role) {
    throw new apiError(400, "topic, difficulty and role are required");
  }
 
      const prompt = `
        Ask a ${difficulty} level interview question about ${topic}.
        The candidate is a ${role} .
         Ask only ONE question. Do not provide hints or the answer.
`

 const question =await generateWithRetry(model,prompt)

 const session= await Session.create(
    {
        userId:req.user._id,
        topic:topic,
        difficulty:difficulty,
        role:role,
        currentQuestion:question
    }
    )

     if(!session){
        throw new apiError(500,"Session could not be created")
    }

 res.json({
    sessionId:session._id,
    question
 })


})

const MAXQ=5;

const submitAnswer=asyncHandler(async(req,res)=>{
    const {sessionId}=req.params
    const {answer}=req.body
    if(!mongoose.Types.ObjectId.isValid(sessionId)){
        throw new apiError(400,"invalid session id")
    }

    const session =await Session.findById(sessionId)
     if (!session) {
    throw new apiError(404, "Session not found");
  }
   
  if (session.status === "completed") {
    throw new apiError(400, "This interview has already ended")
  }

  if (!session.currentQuestion) {
    throw new apiError(400, "No active question on this session");
  }

    const evalprompt = `
  Review this answer to the question: "${session.question}"
  
  Candidate's answer: "${answer}"
  
  Provide feedback in this exact structure:
  - What they got RIGHT (be specific)
  - What they MISSED (be specific)  
  - Score out of 10
  - The ideal complete answer


  IMPORTANT: Respond ONLY in this JSON format, no extra text:
  {
    "score": <number 1-10>,
    "strengths": ["", ""],
    "missing": [""],
    "idealAnswer": "..."
  }


`

  const rawFeedback = await generateWithRetry(model, evalPrompt);

  let feedback;
  try {
    feedback = JSON.parse(rawFeedback.replace(/```json|```/g, "").trim());
  } catch (err) {
    throw new apiError(500, "AI response could not be parsed, please retry");
  }

 

  

  session.history.push({
    question: session.currentQuestion,
    userAnswer: answer,
    strengths: feedback.strengths,
    missing: feedback.missing,
    idealAnswer: feedback.idealAnswer,
    score: feedback.score,
  })

  const questionAsked=session.history.length
  const isLastQuestion=questionAsked >= MAXQ

  let nextQuestion =null;

  if(!isLastQuestion){
    const askedSoFar =session.history.map((h)=>h.question).join("\n")
   const nextPrompt = `
      Ask a ${session.difficulty} level interview question about ${session.topic}.
      The candidate is a ${session.role}.
      This is question ${questionsAsked + 1} of ${MAX_QUESTIONS}.

      Do NOT repeat or closely resemble these already-asked questions:
      - ${askedSoFar}

      Ask only ONE new question. Respond with ONLY the question text —
      no preamble, no numbering.
    `;

    nextQuestion = await generateWithRetry(model, nextPrompt);
    session.currentQuestion = nextQuestion;

  }else{
    session.currentQuestion=undefined
  }

  await session.save()

  res.json({
    feedback,
    nextQuestion,        
    questionsAsked,
    isLastQuestion,       
  })

})

export {
    startInterview,
    submitAnswer
}