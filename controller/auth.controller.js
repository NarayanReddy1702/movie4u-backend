import User from "../model/auth.model.js"

async function authRegister(req,res){
     try {
        const {username,email,password} = req.body

        if(username===""||email===""||password===""){
           return  res.status(401).json({message:"All Fields are required"})
        }
        
        const existingUser =await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message:"User already registered"})
        }

     } catch (error) {
         res.status(404).json({message:"Auth Register error"})
     }
}

function authLogin(req,res){

}

function authLogout(req,res){

}


export {authRegister,authLogin,authLogout}