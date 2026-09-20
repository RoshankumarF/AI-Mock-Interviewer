import {Router} from "express"
import { login, logout, register } from "../controller/user.controller.js"
import {verifyJWT}  from "../middleware/auth.js"

const router =Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").patch(verifyJWT,logout)


export default router