'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let items = require('./db.json').items
    items.forEach(item => {
      item.createdAt = new Date()
      item.updatedAt = new Date()
    });
    
    await queryInterface.bulkInsert('Barangs', items, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Barangs', null, {});
  }
};

