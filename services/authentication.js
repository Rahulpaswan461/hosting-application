const JWT = require("jsonwebtoken")
const secret = "rahul@#$12345"

const generateTokenForUser = (user)=>{
    const payload = {
        _id:user._id,
        name:user.name,
        email:user.email,
    }
    return JWT.sign(payload,secret)
}

const validateGeneratedToken = (token)=>{
     const payload =  JWT.verify(token,secret)
     console.log("The validate payload",payload)
     return payload;
}

module.exports = {
    generateTokenForUser,
    validateGeneratedToken
}