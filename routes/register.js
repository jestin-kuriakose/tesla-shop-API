const express = require("express")
const User = require("../model/User")
const router = express.Router()
const bcrypt = require("bcrypt")

router.post('/', async (req, res) => {
    const { email, password, firstName, lastName, username } = req.body

    if(!email || !password) return res.status(400).json({ 'message': 'Email and Password are required' })

    const duplicate = await User.findOne({ email }).exec()
    if(duplicate) return res.status(409).json({"message": "User exist"})

    try {
        const hasedPassword = await bcrypt.hash(password, 10)
        await User.create({
            "email": email,
            "password": hasedPassword,
            "firstName": firstName,
            "lastName": lastName,
            "username": username
        })
        res.status(201).json({"success": `New User created !`})
    } catch(err) {
        res.status(500).json({"message": err.message})
    }
})

module.exports = router