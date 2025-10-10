import express from "express";
import dotenv from "dotenv"
import authRouter from "./router/auth.router.js"
import movieRoter from "./router/movie.router.js"
import cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config()

const app=express()
app.use(cors({
    origin:"https://movie4u2025.netlify.app/",
    credentials:true
}))

app.use(cookieParser())
app.use(express.json())


app.use("/api/auth/",authRouter)
app.use("/api/movie",movieRoter)
export default app