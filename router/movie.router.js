import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"

import multer from "multer"
import { addMovie, allMovies, deleteMovie, getMovieView, updateMovie } from "../controller/movie.controller.js"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



router.post("/addMovie",authMiddleware,upload.single("image"),addMovie)
router.get("/",allMovies)
router.put("/updateMovie/:id",authMiddleware,upload.single("image"),updateMovie)
router.delete("/deleteMovie/:id",authMiddleware,deleteMovie)
router.get("/movieView/:id",authMiddleware,getMovieView)
export default router