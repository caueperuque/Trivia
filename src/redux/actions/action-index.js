import { GET_LOGIN, GET_SCORE, GET_ASSERTIONS, GET_AVATAR } from './action-types';

export const getLogin = ({ email, name }) => ({
  type: GET_LOGIN,
  email,
  name,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});

export const getAssertions = (assertions) => ({
  type: GET_ASSERTIONS,
  assertions,
});

export const getAvatar = (avatar) => ({
  type: GET_AVATAR,
  avatar,
});
