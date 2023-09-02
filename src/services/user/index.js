/* eslint-disable no-useless-catch */
const db = require('../../../database/models');
const { cacheAllUsers } = require('../../utils/user');
const Boom = require('@hapi/boom');

const createUser = async (payload) => {
  try {
    const { empNo, name, role, contact, email } = payload;
    const user = await db.User.create({
      empNo,
      name,
      role,
      contact,
      email,
    });
    cacheAllUsers();
    return user;
  } catch (error) {
    throw Boom.badRequest('Error getting all users', error);
  }
};

module.exports = {
  createUser,
};