const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConnect")
const logger = require("./middleware/logEvents")
const credentials = require("./middleware/credentials")
const corsOptions = require("./middleware/corsOptions")
const verifyJWT = require("./middleware/verifyJWT")
const PORT = process.env.PORT

connectDB()

app.use(logger)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())

app.use('/register', require("./routes/register"))
app.use('/login', require("./routes/login"))

app.use(verifyJWT)

app.use('/api/v1', require("./routes/root"))
app.use('/api/v1/products', require("./routes/api/products"))
app.use('/api/v1/payment', require("./routes/api/stripe"))

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB")
    app.listen(PORT, ()=> console.log(`Server connected at PORT ${PORT}`))
})


