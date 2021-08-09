const router = require('express').Router()
const permissionsRoute = require('./permissionsRoute')
const barangRoute = require('./barangRoute')
const usersRoute = require('./usersRoute')

router.use('/', usersRoute)
router.use('/permissions', permissionsRoute)
router.use('/barang', barangRoute)

module.exports = router