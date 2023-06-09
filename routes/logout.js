const express = require("express")
const User = require("../model/User")
const router = express.Router()

router.post('/', async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ where: {refreshToken} })
    if(!foundUser) {
        res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
        return res.sendStatus(204)
    }

    foundUser.refreshToken = ''
    const result = await foundUser.save()
    console.log(result)

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true })
    res.sendStatus(204)

})

module.exports = router