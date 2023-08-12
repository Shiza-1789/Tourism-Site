const Router = require('express')
const router = new Router()
const TourController = require('../controllers/tourController')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), TourController.create)
router.get('/', TourController.getAll)
router.get('/:id', TourController.getOne)
router.delete('/:id', checkRole('ADMIN'), TourController.delete)

module.exports = router