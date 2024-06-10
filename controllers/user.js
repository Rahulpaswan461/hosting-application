const User = require("../models/user")

async function hanldeSignupUser(req,res){
    try{
       const {name,email,password} = req.body;

       if(!name || !email || !password) {
        return res.status(403).json({msg:"Information incomplete!!"})
       }
       const result  = await User.create({
           name:name,
           email:email,
           password:password
       })
       if(!result) return res.status(404).json({msg:"Ther is some error"})

        return res.status(201).json({msg:"Signup successfully !!!"})
    }
    catch(error){
       console.log("There is some error",error)
       return res.status(500).json({msg:"Internal server error",error})
    }
}
async function hanldeSigninUser(req,res){
    try{
       const {email, password } = req.body;

       if(!email || !password){
         return res.status(401).json({msg:"Information incomplete !!"})
       }

       const token = await User.matchPasswordAndCompare(email,password)
       console.log(token)
       return res.cookie("token",token).json({msg:"Valid user"})
    }
    catch(error){
        console.log("ther is some error",error)
        return res.status(500).json({msg:"Internal Server error",error})
    }
}
async function getAllTheAvailableUser(req,res){
    try{
         const userData = await User.find({})
         if(!userData){
            return res.status(400).json({msg:"No information available !!"})
         }

         return res.status(200).json(userData)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal Server error",error})
    }
}

module.exports = {
    hanldeSignupUser,
    hanldeSigninUser,
    getAllTheAvailableUser
}