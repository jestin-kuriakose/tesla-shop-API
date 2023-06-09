const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const mongoose = require("mongoose")
const connectDB = require("./config/dbConnect")
const logger = require("./middleware/logEvents")
const credentials = require("./middleware/credentials")
const corsOptions = require("./config/corsOptions")
const verifyJWT = require("./middleware/verifyJWT")
const rateLimiter = require("./middleware/rateLimiter")
const getLocation = require("./middleware/getLocation")
const s3Connect = require("./config/s3Connect")
const PORT = process.env.PORT

connectDB()
// s3Connect()

app.set('trust proxy', true)
app.use(logger)
app.use(getLocation)
app.use(rateLimiter)
app.use(credentials)
app.use(cors(corsOptions))
app.use(express.json())

app.use('/email', require('./routes/email'))
app.use('/register', require("./routes/register"))
app.use('/login', require("./routes/login"))
app.use('/logout', require("./routes/logout"))
app.use('/refresh', require("./routes/refresh"))
app.use('/pdf', require("./routes/pdf"))

// app.use(verifyJWT)

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


