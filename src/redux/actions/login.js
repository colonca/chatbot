export const type = 'login';

const login = (user) => ({
  type,
  payload: user
});

export default login;
