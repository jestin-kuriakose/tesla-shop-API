const { PDFDocument, StandardFonts, rgb } = require("pdf-lib")
const express = require("express");
const s3Connect = require("../config/s3Connect");
const invoiceTemplate = require("../pdfTemplates/invoiceTemplate");
const router = express.Router()

router.post('/', async (req, res) => {
    
    // Get the PDF
    const pdfBytes = await invoiceTemplate()

    // Upload the PDF to AWS S3 and get the URL
    await s3Connect(pdfBytes)
    .then((url) => {
        console.log(url)
        res.status(200).json({ url: url })
    })
    .catch((err) => {
        console.log(err.message)
        res.status(500).json({"error": err.message})
    })
    
})

module.exports = router