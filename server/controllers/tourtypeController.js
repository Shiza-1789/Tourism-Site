const ApiError = require('../error/ApiError')
const {TourType} = require('../models/models')

class TourTypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const tourType = await TourType.create({name})
            return res.json(tourType)
        } catch(e) {
            next(ApiError.badRequest("Неверно указаны данные"))
        }
    }

    async getAll(req, res, next) {
        const tourTypes = await TourType.findAll()
        return res.json(tourTypes)
    }
    
    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const tourType = await TourType.findOne(
                {
                    where: {id}
                }
            )
    
            return res.json(tourType)
        } catch(e) { 
            ApiError.badRequest("Такого типа тура не существует")
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
    
            await TourType.destroy(
                {
                    where: {id}
                }
            )
    
            return res.json(id)
        } catch(e) {
            ApiError.badRequest("Такого типа тура не существует")
        }
    }
}

module.exports = new TourTypeController()