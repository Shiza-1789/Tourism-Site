const Router = require('express')
const router = new Router()
const TourTypeController = require('../controllers/tourtypeController')
const checkRole = require('../middlewares/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), TourTypeController.create)
router.get('/', TourTypeController.getAll)
router.get('/:id', TourTypeController.getOne)
router.delete('/:id', checkRole('ADMIN'), TourTypeController.delete)

module.exports = router