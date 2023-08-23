const {createUser} = require('../../services/user');

const userRegistration = async (request, h) => {
  try {
    const user = await createUser(request.payload);
    return h.response(user).code(201);
  } catch (error) {
    return h.response(error).code(500);
  }
};

module.exports = {
  userRegistration,
};