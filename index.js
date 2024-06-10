require("dotenv").config()
const express = require("express")
const {connectMongoDB}  =  require("./connection")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser")
const { checkForAuthenticateUser } = require("./middleware/authentication")
const booksRoute = require("./routes/books")

const app = express()
const PORT = process.env.PORT || 8000

connectMongoDB(process.env.MONGO_URL)
.then(()=>console.log("Mongo is connected successfully !!"))
.catch(error=>console.log("There is some error while connecting",error))

app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthenticateUser("token"))


app.get('/',(req,res)=>{
    return res.send("From the server")
})
app.use('/user',userRoute)
app.use("/api/books",booksRoute)
app.listen(PORT,()=>{
    console.log("Server is running at PORT 8000")
})