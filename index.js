const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.use('/api/v1', require("./routes/root"))

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.listen(process.env.PORT || 3000)