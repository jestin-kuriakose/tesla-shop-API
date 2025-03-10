const express = require('express')
const User = require('../model/User')
const router = express.Router()

router.get('/', async(req, res) => {
    const cookies = req.cookies
    if(!cookies.jwt) return res.sendStatus(401)
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ where: { refreshToken } })
    if(!foundUser) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.email !== decoded.email) {
                return res.sendStatus(403)
            }
            const roles = foundUser.roles

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "email": decoded.email,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "100s" }
            );

            res.json({ roles, accessToken })
        }
    )

})

module.exports = router