const router = require('express').Router()
const usersRoute = require('./usersRoute')
const errorHandler = require('../middlewares/errorHandler')

router.use('/', usersRoute)

router.use(errorHandler)

module.exports = router