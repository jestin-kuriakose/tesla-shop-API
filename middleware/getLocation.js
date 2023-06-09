const { default: axios } = require("axios")

const getLocation = async (req, res, next) => {
    const ipAddress = req.ip
    const URL = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.LOCATION_API_KEY}`

    try {
        const result = await axios.get(URL + "&ip=" + ipAddress)
        console.log(result.data)
    } catch(err) {
        console.log(err.response.data.message)
    }
    
    next()
}

module.exports = getLocation

