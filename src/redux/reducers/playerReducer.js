import { GET_LOGIN } from '../actions/action-types';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return {
      ...state,
      gravatarEmail: action.email,
      name: action.name,
    };
  default:
    return state;
  }
};

export default playerReducer;
