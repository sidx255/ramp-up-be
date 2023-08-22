/* eslint-disable no-unused-vars */
'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    empNos: DataTypes.ARRAY(DataTypes.STRING),
    organizer: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    eventName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    from: {
      allowNull: false,
      type: DataTypes.DATE
    },
    to: {
      allowNull: false,
      type: DataTypes.DATE
    },
    room: DataTypes.UUID,
    description: DataTypes.TEXT,
    link: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Event',
    underscored: true,
    tableName: 'events'
  });
  Event.beforeCreate((Event) => {
    Event.id = uuidv4();
  });
  return Event;
};