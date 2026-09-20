import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import { startInterview, submitAnswer } from "../controller/interview.controller.js";


const router=Router()

router.use(verifyJWT)

router.route("/start-interview").post(startInterview)
router.route("/submit-answer/:sessionId").post(submitAnswer)

export default router