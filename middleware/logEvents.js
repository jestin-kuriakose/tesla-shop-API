const path = require("path")
const fs = require("fs")

const logEvents = async (message, logName) => {
    const dateTime = new Date()
    const logItem = `${dateTime}\t${message}\n`

    try {
        if( !fs.existsSync(path.join(__dirname, '..', 'logs')) ) {
            await fs.mkdir(path.join(__dirname, '..', 'logs'), (err) => {
                if(err) {
                    console.log(err)
                }
                console.log("Directory Created")
            })
        }
        await fs.appendFile(path.join(__dirname, '..', 'logs', logName), logItem, (err) => {
            if(err) {
                console.log(err)
            }
        })
    } catch(err) {
        console.log(err)
    }
}


const logger = (req, res, next) => {
    logEvents(`${req?.method}\t${req?.headers.origin}\t${req?.url}`, 'requestLog.txt')
    console.log(`${req?.method} ${req?.path}`)
    next()
}

module.exports = logger