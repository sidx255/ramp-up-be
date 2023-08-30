const db = require('../../../database/models');

const getAllUsersDb = async () => {
  const users = await db.User.findAll(
    {
      attributes: ['email', 'emp_no', 'name', 'role', 'contact']
    }
  );

  return users;
};

const cacheAllUsers = async () => {
  const users = await getAllUsersDb();
  await global.redisClient.set('allUsers', JSON.stringify(users));
  return users;
};

module.exports = {
  getAllUsersDb,
  cacheAllUsers
};
