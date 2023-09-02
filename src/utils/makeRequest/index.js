const axios = require('axios');

const makeRequest = async (method, url, data, headers = {}) => {
  const response = await axios({
    method,
    url,
    data,
    headers
  });
  return response.data;
};


module.exports = makeRequest;