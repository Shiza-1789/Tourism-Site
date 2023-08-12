const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const tourRouter = require('./tourRouter')
const tourtypeRouter = require('./tourtypeRouter')
const orderRouter = require('./orderRouter')
const ukassaRouter = require('./ukassaRouter')

router.use('/user', userRouter)
router.use('/tour', tourRouter)
router.use('/tourtype', tourtypeRouter)
router.use('/order', orderRouter)
router.use('/ukassa', ukassaRouter)

module.exports = router