'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class line_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      line_item.belongsTo(models.villa);
      line_item.belongsTo(models.cart);
    }
  };
  line_item.init({
    status: DataTypes.STRING,
    villaId: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'line_item',
  });
  return line_item;
};