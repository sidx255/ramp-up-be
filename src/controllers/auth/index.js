/* eslint-disable no-unused-vars */
const authServices = require('../../services/auth');

const login = async (request, h) => {
  const { email, password } = request.payload;
  const response = await authServices.login(email, password);
  return response;
};

const register = async (request, h) => {
  const { email, password } = request.payload;
  const response = await authServices.register(email, password);
  return response;
};

const verify = async (request, h) => {
  const token = request.headers.authorization;
  const response = await authServices.verify(token);
  return response;
};

module.exports = {
  login,
  register,
  verify
};