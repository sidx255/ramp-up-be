/* eslint-disable no-useless-catch */
const db = require('../../../database/models');

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
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};