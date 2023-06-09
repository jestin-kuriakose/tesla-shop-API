const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRole = req?.role
        if(!userRole) return res.sendStatus(401)
        const rolesArray = [...allowedRoles]
        const result = [userRole].map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles