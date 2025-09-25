import mongoose from "mongoose";

const {Schema,model}=mongoose

const authUser = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
     role: {
    type: String,
    enum: ["user", "admin"], 
    default: "user"
  }
},{timestamps:true})

const User = model("user",authUser)
export default User 