import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import getMovie from "../model/movie.model.js"

const router = express.Router()


router.get("/",authMiddleware,getMovie)
export default router