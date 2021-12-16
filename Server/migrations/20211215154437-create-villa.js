'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('villas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      tipe: {
        type: Sequelize.STRING
      },
      kamar_tidur: {
        type: Sequelize.INTEGER
      },
      kamar_mandi: {
        type: Sequelize.INTEGER
      },
      lantai: {
        type: Sequelize.INTEGER
      },
      fasilitas: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.INTEGER
      },
      image_satu: {
        type: Sequelize.STRING
      },
      image_dua: {
        type: Sequelize.STRING
      },
      image_tiga: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('villas');
  }
};