'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class villa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      villa.belongsTo(models.user);
    }
  };
  villa.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    tipe: DataTypes.STRING,
    kamar_tidur: DataTypes.INTEGER,
    kamar_mandi: DataTypes.INTEGER,
    lantai: DataTypes.INTEGER,
    fasilitas: DataTypes.STRING,
    price: DataTypes.INTEGER,
    image_satu: DataTypes.STRING,
    image_dua: DataTypes.STRING,
    image_tiga: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'villa',
  });
  return villa;
};