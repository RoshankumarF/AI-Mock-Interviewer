import { model } from "mongoose";

const generateWithRetry=async(model,prompt,retries=5)=>{
    for(let i=0;i<retries;i++){
        try {
            const result=await model.generateContent(prompt)
            return result.response.text()
            
        } catch (error) {
            const isLastAttempt=i===retries-1

             if (error.status === 503 || error.status === 429) {
        if (isLastAttempt) {
          throw new Error("AI service unavailable, please try again");
        }

         
        const waitTime = Math.pow(2, i) * 1000
        console.log(`Attempt ${i + 1} failed. Retrying in ${waitTime}ms...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
            
        }else {
        
        throw error;
      }
    }
       }     
}

export default generateWithRetry