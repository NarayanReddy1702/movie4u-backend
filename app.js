import express from "express";
import dotenv from "dotenv"
import authRouter from "./router/auth.router.js"
import movieRoter from "./router/movie.router.js"





const app=express()
dotenv.config()
app.use(express.json())

app.get("/",(req,res)=>{
   res.status(201).json({message:"Backend is worked" , success:true})
})
app.use("/api/auth/",authRouter)
app.use("/api/movie",movieRoter)
export default app