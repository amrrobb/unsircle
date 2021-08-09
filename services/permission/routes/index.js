const router = require('express').Router()
const permissionsRoute = require('./permissionsRoute')
const errorHandler = require('../middlewares/errorHandler')
const authentication = require('../middlewares/auth')

router.use(authentication)
router.use('/permissions', permissionsRoute)
router.use(errorHandler)

module.exports = router