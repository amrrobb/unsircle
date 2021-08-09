const router = require('express').Router()
const barangRoute = require('./barangRoute')
const errorHandler = require('../middlewares/errorHandler')
const authorization = require('../middlewares/auth')

router.use(authorization)

router.use('/barang', barangRoute)

router.use(errorHandler)

module.exports = router