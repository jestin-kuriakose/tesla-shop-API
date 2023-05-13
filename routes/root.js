const app = require('express')
const User = require('../model/User')

const router = app.Router()

router.get('/', async (req, res) => {
    const resp = new User( {email: "jes@gmail.com", username: "jestink", password: "test123", firstName: "test1", lastName: "last2"} )
    await resp.save()
    console.log(resp)
    res.status(200).json({message: "This is the root endpoint"})
})

module.exports = router