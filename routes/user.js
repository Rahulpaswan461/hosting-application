const express = require("express")
const {hanldeSignupUser,hanldeSigninUser,getAllTheAvailableUser} = require("../controllers/user")
const { checkForAuthenticateUser } = require("../middleware/authentication")
const User = require("../models/user")
const router = express.Router()

router.post('/signup',hanldeSignupUser)
router.post("/signin",checkForAuthenticateUser("token"),hanldeSigninUser)
router.get("/allusers",getAllTheAvailableUser)
router.get("/data",(req,res)=>{
    return res.status(200).json({msg:"Successs !!!!!"})
})

module.exports = router