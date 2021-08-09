const router = require('express').Router()
const permissionsController = require('../controllers/permissionsController')

router.get('/', permissionsController.findPermission)
router.post('/', permissionsController.addPermission)

module.exports = router