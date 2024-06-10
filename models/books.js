const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    publishingDate:{
        type:Date,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }
},{timestamps:true})

const Books = mongoose.model("books",bookSchema)

module.exports = Books