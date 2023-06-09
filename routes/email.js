const express = require("express")
const router = express.Router()

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});


router.post('/', async (req, res) => {
    const { from, to, subject, text } = req.body
    const signedUrl = "https://tesla-shop.s3.ap-northeast-1.amazonaws.com/output1.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUUGT2KHQHSCLZCOJ%2F20230609%2Fap-northeast-1%2Fs3%2Faws4_request&X-Amz-Date=20230609T185153Z&X-Amz-Expires=3600&X-Amz-Signature=d665ffa2c2aa8a132baf43194a73e54400700109aedd06eb43c4a3d3c369bd06&X-Amz-SignedHeaders=host&x-id=GetObject"
    try {
        let info = await transporter.sendMail({
            from: '"FullStack Digital" <jestink92@gmail.com>',
            to: "jestink@live.com", 
            subject: "Your invoice is ready !",
            text: "Please find the attached invoice.",
            html: "<b>Invoice</b>",
            attachments: [
                {
                  filename: 'output.pdf', // The name of the PDF file to be attached
                  path: signedUrl, // The signed URL of the PDF file
                },
            ],
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({"message": "Email sent successfully"})
    } catch(err) {
        console.log(err)
    }
    
})

module.exports = router