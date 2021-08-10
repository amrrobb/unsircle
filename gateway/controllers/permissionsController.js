const User = require('./usersController')
const {instancePermissions} = require('../axios')

class Controller {   
    static async findPermission(req, res, next) {
        try {
            const response = await User.authentication(req, res)
            const {validUser, access_token} = response
            // if (validUser) {
            // }
            const {data: {permission_token}} = await instancePermissions.get('/permissions', {
                headers: {access_token}
            })
            return permission_token
        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }

    static async addPermission(req, res, next) {
        try {
            
            const response = await User.authentication(req, res)
            const {validUser, access_token} = response
            // if (validUser) {
                // }
            const {canAdd, canEdit, canDelete, canView} = req.body
            let input = {canAdd, canEdit, canDelete, canView}

            const {data} = await instancePermissions({
                url: '/permissions', 
                method: "post",
                headers: {access_token}
            })

            res.status(200).json(data);

        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }
}

module.exports = Controller