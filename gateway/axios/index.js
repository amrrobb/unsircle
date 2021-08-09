const axios = require('axios')

const instanceUsers = axios.create({
  baseURL: `http://localhost:4001`
})

const instancePermissions = axios.create({
    baseURL: `http://localhost:4002`,
  });

const instanceBarang = axios.create({
    baseURL: `http://localhost:4003`
})



module.exports = {instanceBarang, instancePermissions, instanceUsers}


