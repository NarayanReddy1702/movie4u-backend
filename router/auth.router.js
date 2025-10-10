import express from "express"
import { authLogin, authLogout, authRegister, getUsers, updateUser } from "../controller/auth.controller.js"
import authMiddleware from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/register",authRegister)
router.post("/login",authLogin)
router.post("/logout",authLogout)
router.get("/allUser",getUsers)
router.put("/updateUser/:id",updateUser)

export default router