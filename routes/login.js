const express = require("express")
const User = require("../model/User")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post('/', async(req, res) => {
    const { email, password } = req.body
    if(!email || !password) return res.status(400).json({"message": "Email and Password are required"})

    const foundUser = await User.findOne({ email }).exec()
    if(!foundUser) return res.status(401).json({"message": "No user found"})

    const passwordMatch = await bcrypt.compare(password, foundUser.password)
    if(!passwordMatch) return res.status(401).json({"message": "Wrong credentials"})

    const roles = Object.values(foundUser.roles).filter(Boolean)

    const accessToken = jwt.sign(
        {
            "UserInfo": 
                {
                    "email": foundUser.email,
                    "roles": roles
                },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
    )

    const refreshToken = jwt.sign(
        { "email": foundUser.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })

    res.status(200).json({ roles, accessToken })
})

module.exports = router