import axios from 'axios';

const AuthServices = {
  login: async (credentials) => {
    const { data } = await axios.post('/api/auth/login', credentials);
    return data;
  },
  whoami: async () => {
    const { data } = await axios.post('/api/auth/user');
    return data;
  }
};

export default AuthServices;
