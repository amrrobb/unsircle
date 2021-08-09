const router = require('express').Router()
const barangController = require('../controllers/barangController')

router.get('/', barangController.findAll)
router.get('/:id', barangController.findOne)
router.post('/', barangController.create)
router.put('/:id', barangController.update)
router.delete('/:id', barangController.delete)

module.exports = router