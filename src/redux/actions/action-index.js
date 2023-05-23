import { GET_LOGIN, GET_SCORE } from './action-types';

export const getLogin = ({ email, name }) => ({
  type: GET_LOGIN,
  email,
  name,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});
