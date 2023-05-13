const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConnect")
const PORT = process.env.PORT || 3001

connectDB()

app.use(cors())
app.use(express.json())

app.use('/register', require("./routes/register"))
app.use('/login', require("./routes/login"))

app.use('/api/v1', require("./routes/root"))
app.use('/api/v1/products', require("./routes/api/products"))

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, ()=> console.log(`Server connected at PORT ${PORT}`))
})


