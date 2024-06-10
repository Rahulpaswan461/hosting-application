const Books = require("../models/books")

async function addBookInformation(req,res){
    try{
        const {title,author,publishingDate,price} = req.body;

        if(!title || !author || !publishingDate || !price){
            return res.status(400).json({message:"Information is incomplete !!"})
        }

        const result = await Books.create({
            title,
            author,
            publishingDate:new Date(publishingDate),
            price,
            createdBy:req.user._id
        })

        if(!result){
            return res.status(400).json({msg:"Some error there !!!"})
        }

        return res.status(200).json(result)
    }
    catch(error){
        console.log("There is some error",error)
        return res.status(500).json({msg:"Internal server error"})
    }

}
async function getAllTheAvailableBooks(req,res){
    try{
          const booksInformation = await Books.find({})

          if(!booksInformation)
            return res.status(400).json({msg:"No data is available!!"})

          return res.status(200).json(booksInformation)
    }
    catch(error){
        console.log("There is some error")
        return res.status(500).json({msg:"Internal server error",err:error})
    }
}
module.exports ={
    addBookInformation,
    getAllTheAvailableBooks
}
