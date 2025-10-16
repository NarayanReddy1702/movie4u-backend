import express from "express"
import { authLogin, authLogout, authRegister, deleteUser, getOneUser, getUsers, updateUser } from "../controller/auth.controller.js"


const router = express.Router()

router.post("/register",authRegister)
router.post("/login",authLogin)
router.post("/logout",authLogout)
router.get("/allUser",getUsers)
router.put("/updateUser/:id",updateUser)
router.delete("/deleteUser/:id",deleteUser)
router.get("/getOneUser/:id",getOneUser)

export default router