const app = require('express')

const router = app.Router()

router.get('/', (req, res) => {
    res.status(200).json({message: "This is the root endpoint"})
})

module.exports = router