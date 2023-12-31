/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
    }
  }
  Team.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    empNos: DataTypes.ARRAY(DataTypes.STRING),
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Team',
    underscored: true,
    tableName: 'teams'
  });
  Team.beforeCreate((Team) => {
    Team.id = uuidv4();
  });
  return Team;
};