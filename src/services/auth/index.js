const makeRequest = require('../../utils/makeRequest');
const {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_VERIFY
} = require('../../constants/makeRequestUri');
const Boom = require('@hapi/boom');

const login = async (email, password) => {
  const response = await makeRequest('POST', AUTH_LOGIN, { email, password });
  return response;
};

const register = async (email, password) => {
  const response = await makeRequest('POST', AUTH_REGISTER, { email, password });
  return response;
};

const verify = async (token) => {
  try {
    const response = await makeRequest('GET', AUTH_VERIFY, {}, { authorization: token });
    return response;
  } catch (error) {
    throw Boom.unauthorized(error);
  }
};

module.exports = {
  login,
  register,
  verify
};