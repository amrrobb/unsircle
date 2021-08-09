const {instanceUsers} = require('../axios')

class Controller {
    static async register (req, res, next){
        try {
            let {email, password} = req.body
            let input = {email, password}
    
            const {data} = await instanceUsers.post("/register", input)
            res.status(200).json(data)
             
        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }
    
    static async login (req, res, next){
        try {
            let {email, password} = req.body
            let input = {email, password}
    
            const {data} = await instanceUsers.post("/login", input)
            res.status(200).json(data)

        } 
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }

    static async authentication(req, res, next) {
        try {
            const access_token = req.headers.access_token || null
        
            const {data: {validUser}} = await instanceUsers.get("/authentication", {
                headers: {access_token}
            })

            return {validUser, access_token}

        } 
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }
}

module.exports = Controller