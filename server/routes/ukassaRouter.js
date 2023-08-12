const Router = require('express')
const router = new Router()
const UkassaController = require('../controllers/ukassaController')

router.post('/', UkassaController.pay)
router.post('/confirmation', UkassaController.confirmation)

module.exports = router