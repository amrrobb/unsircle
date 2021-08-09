const {Permission} = require('../models')
const {generateToken} = require('../helpers')

class Controller {   
    static async findPermission(req, res, next) {
        try {
            const {id: userId} = req.user
            const data = await Permission.findOne({where: {userId}})
            if (!data) {
                next({code: 404, message: "You don't have any permission!"})
            }
            const {canAdd, canEdit, canDelete, canView} = data
            const permission_token = generateToken({
                canAdd, canEdit, canDelete, canView
            })
            res.status(200).json({permission_token})
        }
        catch(err) {
            next({code: 500, message: err.message})
        }
    }

    static async addPermission(req, res, next) {
        try {
            const {id: userId} = req.user
            const permission = await Permission.findOne({where: {userId}})
            if (permission) {
                next({code: 400, message: "You already have permission!"})
            }

            let {canAdd, canEdit, canDelete, canView} = req.body
            canAdd = canAdd || false
            canEdit = canEdit || false
            canDelete = canDelete || false
            canView = canView || false

            const input = {userId, canAdd, canEdit, canDelete, canView}

            const data = await Permission.create(input)
            res.status(200).json(data)

        }
        catch(err) {
            next({code: 500, message: err.message})
        }
    }
}

module.exports = Controller