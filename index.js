const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConnect")

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/v1', require("./routes/root"))

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(3001, ()=> console.log(`Server connected`))
})


