const requestCounts = {}

const rateLimiter = (req, res, next) => {
    const ipAddress = req.ip
    const ip = req.socket.remoteAddress
    console.log(ip)

    if(requestCounts[ipAddress]) {
        if(requestCounts[ipAddress] >= 100) {
            console.log("Too many requests")
            return res.status(429).json({ "error": "Too many requests" })
        }
        console.log(requestCounts)
        requestCounts[ipAddress]++;
    } else {
        requestCounts[ipAddress] = 1
        console.log(requestCounts)
    }
    next();
}

module.exports = rateLimiter;