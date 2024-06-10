const express = require("express")
const {addBookInformation,getAllTheAvailableBooks } = require("../controllers/books")

const router = express.Router()

router.post("/allbooks",addBookInformation)
router.get("/allbooks",getAllTheAvailableBooks)

module.exports = router