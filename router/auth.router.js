import express from "express"
import { authLogin, authLogout, authRegister } from "../controller/auth.controller.js"

const router = express.Router()

router.post("/register",authRegister)
router.post("/login",authLogin)
router.post("/logout",authLogout)

export default router