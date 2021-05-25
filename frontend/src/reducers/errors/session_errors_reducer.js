import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  CLEAR_SESSION_ERRORS
} from '../../actions/session_actions';
import {
  CLOSE_MODAL
} from '../../actions/ui_actions';

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS: 
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    case CLEAR_SESSION_ERRORS:
      return _nullErrors;
    case CLOSE_MODAL:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;

