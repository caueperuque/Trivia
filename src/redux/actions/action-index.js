import { GET_LOGIN } from './action-types';

export const getLogin = ({ email, name }) => ({
  type: GET_LOGIN,
  email,
  name,
});
