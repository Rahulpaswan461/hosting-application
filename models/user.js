const mongoose = require("mongoose")
const {createHmac,randomBytes} = require("crypto");
const { error } = require("console");
const { generateTokenForUser } = require("../services/authentication");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
     const user  = this;
     const salt = randomBytes(16).toString()

     const hashedPassword = createHmac("sha256",salt)
     .update(user.password)
     .digest("hex")

     user.password = hashedPassword;
     user.salt = salt;
     next();
})
userSchema.static("matchPasswordAndCompare",async function(email,password){
    const user = await this.findOne({email:email})
    if(!user) throw new Error("user not found !!")

    const salt = user.salt;

    const hashedPassword = user.password;

    const newHashedPassword = createHmac("sha256",salt)
    .update(password)
    .digest("hex")

    if(hashedPassword !==newHashedPassword) throw new Error("User is not valid")

    const token = generateTokenForUser(user)

    return token;
})

const User = mongoose.model("user",userSchema)

module.exports = User