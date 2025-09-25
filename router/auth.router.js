import express from "express"
import { authLogin, authLogout, authRegister, getUsers } from "../controller/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register",authRegister)
router.post("/login",authLogin)
router.post("/logout",authLogout)
router.get("/allUser",authMiddleware,getUsers)

export default router