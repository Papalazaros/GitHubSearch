import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.github.com/search/',
});

instance.interceptors.response.use((response) => response, (error) => {
  console.log(error.response.data);
  console.log(error.response.headers);

  const rateLimitRemaining = parseInt(error.response.headers['x-ratelimit-remaining']);
  const rateLimitReset = parseInt(error.response.headers['x-ratelimit-reset']) * 1000;
  const now = +new Date();

  if (error.response.status === 403 && rateLimitRemaining === 0 && rateLimitReset > now) {
    return new Promise((x) => setTimeout(x, (rateLimitReset - now) + 1000)).then(() => instance(error.config));
  }
  return Promise.reject(error);
});

function getPaginatedResponse(objectName, query, page = 1, itemsPerPage = 100) {
  const config = {
    method: 'get',
    url: objectName,
    params: {
      q: query,
      page,
      per_page: itemsPerPage,
    },
  };

  return instance(config);
}

export {
  getPaginatedResponse,
};
