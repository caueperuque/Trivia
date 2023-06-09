import {
  GET_ASSERTIONS,
  GET_LOGIN,
  GET_SCORE,
  GET_AVATAR,
} from '../actions/action-types';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarAvatar: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.score,
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  case GET_AVATAR:
    return {
      ...state,
      gravatarAvatar: action.avatar,
    };
  default:
    return state;
  }
};

export default playerReducer;
