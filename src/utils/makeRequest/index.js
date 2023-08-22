const axios = require('axios');

const makeRequest = async (method, url, data, headers = {}) => {
  const response = await axios({
    method,
    url,
    data,
    // optional headers
    headers
  });
  return response.data;
};


module.exports = makeRequest;