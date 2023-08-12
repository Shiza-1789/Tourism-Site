const { Op } = require('sequelize')
const ApiError = require('../error/ApiError')
const {Order, Tour} = require('../models/models')

class OrderController {
    async getAll(req, res, next) {
        try {
            const { userId } = req.params
            const orders = await Order.findAll(
                {
                    include: {
                        model: Tour,
                        attributes: ['name', 'date', 'duration', 'img']
                    },
                    where: {[Op.and]:[{userId}, {status: "CONFIRMED"}]}
                }
            )
    
            return res.json(orders)
        } catch (e) {
            next(ApiError.badRequest("Такого пользователя не существует"))
        }
    }

    async checkAvaible(req, res, next) {
        try {
            const { tourId } = req.params
            const orders = await Order.findAndCountAll(
                {
                    include: {
                        model: Tour,
                        attributes: ['name', 'date', 'duration', 'img', 'amountofparticipants']
                    },
                    where: {[Op.and]:[{tourId}, {status: "CONFIRMED"}]}
                }
            )

            const tour = await Tour.findOne({tourId})

            if (orders.count < tour.amountofparticipants)
                return res.json(true)
            else
                return res.json(false)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        
    }
}

module.exports = new OrderController()