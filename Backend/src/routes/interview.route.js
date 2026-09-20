import { Router } from "express";
import { verifyJWT } from "../middleware/auth.js";
import { endInterview, startInterview, submitAnswer } from "../controller/interview.controller.js";


const router=Router()

router.use(verifyJWT)

router.route("/start-interview").post(startInterview)
router.route("/submit-answer/:sessionId").post(submitAnswer)
router.route("/end-interview/:sessionId").post(endInterview)

export default router