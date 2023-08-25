/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    empNo: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    role: DataTypes.STRING,
    contact: DataTypes.STRING,
    events: DataTypes.ARRAY(DataTypes.UUID),
    teams: DataTypes.ARRAY(DataTypes.UUID)
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    tableName: 'users'
  });

  User.beforeCreate((User) => {
    User.id = uuidv4();
  });
  return User;
};