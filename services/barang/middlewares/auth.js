const { verifyToken } = require('../helpers') 

function authorization(req, res, next) {
    try {
        const permission_token = req.headers.permission_token || null
        const payload = verifyToken(permission_token)
    
        if (payload) {
            req.user = payload     
            next()
        }
        else {
            next({code: 401, message: "Invalid access token"})
        }

    }
    catch (err) {
        if (err.name === "JsonWebTokenError") {
            next({code: 401, message: "User must login with specified account"})
        }
        else {
            next({code: 500, message: err.message})
        }

    }

}

module.exports = authorization