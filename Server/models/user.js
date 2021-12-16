'use strict';
const {
  Model
} = require('sequelize');
const { encryptPwd } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.villa);
      user.hasMany(models.order);
      user.hasMany(models.cart);
      user.hasMany(models.comment);
    }
  };
  user.init({
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: "name cant be empty" },
    },
    email: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: {
          message: "email cant be empty"
        },
        isEmail: {
          message: "Email must be email"
        } 
      },
        unique: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          message: "password cant be empty"
        }
      }
    },
    role: {type: DataTypes.STRING, defaultValue: "customer"},
    avatar: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function (user, options) {
        user.password = encryptPwd(user.password);
        user.avatar = "http://via.placeholder.com/150";
      },
      beforeUpdate: function (user, options) {
        user.password = encryptPwd(user.password);
      },
    },
    sequelize,
    modelName: 'user',
  });
  return user;
};