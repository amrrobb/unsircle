const {Barang} = require('../models')

class Controller {
    static async create(req, res, next){
        try {
            const {canAdd} = req.user
            if (!canAdd){
                next({code: 403, message: "You don't have permission to Add Item"})
            }
            const {name, category, amount, price} = req.body
            const input = {name, category, amount, price} 

            const data = await Barang.create(input)
            res.status(201).json(data)
        }
        catch (err) {
            if (err.name === "SequelizeValidationError"){
                next({code: 400, sequelize: err.errors, name: err.name})
            } 
            else  {
                next({code: 500, message: err.message})
            }
        }
    }
    
    static async findAll(req, res, next){
        try {
            const data = await Barang.findAll({
                order: [
                    ["updatedAt", "DESC"]
                ]
            })
            res.status(200).json(data)

        }
        catch(err) {
            next({code: 500, message: err.message})
        }
    }

    static async findOne(req, res, next){
        try {
            const {canView} = req.user
            if (!canView){
                next({code: 403, message: "You don't have permission to View Item"})
            }
            const id = req.params.id
            const data = await Barang.findByPk(id)
            if(data){
                res.status(200).json(data)
            }
            else {
                next({code: 404, message: "Item not found"})
            }
        }
        catch(err) {
            next({code: 500, message: err.message})
        }
    }

    static async update(req, res, next){
        try {
            const {canEdit} = req.user
            if (!canEdit){
                next({code: 403, message: "You don't have permission to Edit Item"})
            }
            const id = req.params.id
            const {name, category, amount, price} = req.body
            const input = {name, category, amount, price} 

            const data = await Barang.update(input, {
                where: {id},
                returning: true
            })
            if (data[0]) {
                res.status(200).json(data[1][0])
            } else {
                next({code: 404, message: "Item not found"})
            }
        }
        catch (err) {
            if (err.name === "SequelizeValidationError"){
                next({code: 400, sequelize: err.errors, name: err.name})
            } 
            else  {
                next({code: 500, message: err.message})
            }
        }
    }

    static async delete(req, res, next){
        try {
            const {canDelete} = req.user
            if (!canDelete){
                next({code: 403, message: "You don't have permission to Delete Item"})
            }
            const id = req.params.id
            const data = await Barang.destroy({
                where: {id}
            })
            if (data) {
                res.status(200).json(data)
            } 
            else {
                next({code: 404, message: "Item not found"})
            }

        }
        catch (err) {
            next({code: 500, message: err.message})
        }
    }
}

module.exports = Controller