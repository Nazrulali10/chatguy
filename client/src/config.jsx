
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001'
    : '/api';

export default BASE_URL;
