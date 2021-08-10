const Permission = require('./permissionsController')
const {instanceBarang} = require('../axios')

class Controller {
    static async create(req, res, next){
        try {
            const {name, category, amount, price} = req.body
            const input = {name, category, amount, price} 

            const permission_token = await Permission.findPermission(req, res)
            const {data} = await instanceBarang({
                url: "/barang",
                method: "post",
                data: input,
                headers: {permission_token}
            })
            
            res.status(201).json(data)
        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }
    
    static async findAll(req, res, next){
        try {
            const permission_token = await Permission.findPermission(req, res)
            const {data} = await instanceBarang({
                url: `/barang`,
                method: "get",
                headers: {permission_token}
            })
            res.status(200).json(data)

        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }

    static async findOne(req, res, next){
        try {
            const id = req.params.id
            const permission_token = await Permission.findPermission(req, res)
            const {data} = await instanceBarang({
                url: `/barang/${id}`,
                method: "get",
                headers: {permission_token}
            })
            res.status(200).json(data)
        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }

    static async update(req, res, next){
        try {
            const id = req.params.id
            const {name, category, amount, price} = req.body
            const input = {name, category, amount, price} 

            const permission_token = await Permission.findPermission(req, res)
            const {data} = await instanceBarang({
                url: `/barang/${id}`,
                method: "put",
                data: input,
                headers: {permission_token}

            })
            
            res.status(200).json(data)
        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }

    static async delete(req, res, next){
        try {
            const id = req.params.id
            const permission_token = await Permission.findPermission(req, res)
            const {data} = await instanceBarang({
                url: `/barang/${id}`,
                method: "delete",
                headers: {permission_token}
            })
            res.status(200).json(data)
        }
        catch (err) {
            const {data} = err.response
            res.status(data.code).json(data);
        }
    }
}

module.exports = Controller