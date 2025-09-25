import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"

import multer from "multer"
import { addMovie } from "../controller/movie.controller.js"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



router.post("/addMovie",authMiddleware,upload.single("image"),addMovie)
export default router