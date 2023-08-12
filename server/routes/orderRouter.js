const Router = require('express')
const router = new Router()
const OrderController = require('../controllers/orderController')

router.get('/:userId', OrderController.getAll)
router.get('/check/:tourId', OrderController.checkAvaible)
router.delete('/:id', OrderController.delete)

module.exports = router