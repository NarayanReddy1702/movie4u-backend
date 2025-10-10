import express from "express"


import multer from "multer"
import { addMovie, allMovies, deleteMovie, getMovieView, updateMovie } from "../controller/movie.controller.js"

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })



router.post("/addMovie",upload.single("image"),addMovie)
router.get("/",allMovies)
router.put("/updateMovie/:id",upload.single("image"),updateMovie)
router.delete("/deleteMovie/:id",deleteMovie)
router.get("/movieView/:id",getMovieView)
export default router