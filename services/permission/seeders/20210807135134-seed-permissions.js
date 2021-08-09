'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let permissions = require('./db.json').permissions
    permissions.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    
    await queryInterface.bulkInsert('Permissions', permissions, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Permissions', null, {});
  }
};

