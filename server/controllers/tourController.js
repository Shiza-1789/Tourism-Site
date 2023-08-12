const ApiError = require('../error/ApiError')
const {Tour} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize')

class TourController {
    async create(req, res, next) {
        try {
            const { name, date, duration, place, price, difficulty, description, amountofparticipants, tourTypeId } = req.body
            const { img } = req.files

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))

            const tour = await Tour.create({name, date, duration, place, difficulty, description, img: fileName, price, amountofparticipants, tourTypeId})            
            return res.json(tour)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {       
            let { tourTypeId, limit, page, name } = req.query
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit
            let tour
    
            if (!tourTypeId && !name)
            {
                tour = await Tour.findAndCountAll({limit, offset})
            }
            if (!tourTypeId && name)
            {
                tour = await Tour.findAndCountAll({where: { name: {[Op.iLike]: `%${name}%`} }, limit, offset}) 
            }
            if (tourTypeId && !name)
            {
                tour = await Tour.findAndCountAll({where: { tourTypeId }, limit, offset}) 
            }
            if (tourTypeId && name)
            {
                tour = await Tour.findAndCountAll({where: {[Op.and]:[{name: {[Op.iLike]: `%${name}%`}}, {tourTypeId}]}, limit, offset}) 
            }
    
            return res.json(tour)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const tour = await Tour.findOne({where: {id}})
    
            return res.json(tour)
        } catch (e) {
            next(ApiError.badRequest("Такого тура не существует"))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params

            await Tour.destroy(
                {
                    where: {id}
                }
            )

            return res.json(id)
        } catch (e) {
            next(ApiError.badRequest("Такого тура не существует"))
        }
    }
}

module.exports = new TourController()