 
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

 
export const model = genAI.getGenerativeModel({ 
  model: "gemini-3.8-flash",
  systemInstruction: `You are a senior software engineer conducting 
  technical interviews at a top tech company. 
  
  Your behavior:
  - Ask ONE technical question at a time
  - Be professional but encouraging  
  - Give detailed feedback after each answer
  - Never reveal the ideal answer before user responds
  - Focus on: React, Node.js, DSA, System Design`

});
 
 