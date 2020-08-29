import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  authError: string;
  isLoading: boolean;
  user: User;
}

const initialState: State = {
  authError: null,
  isLoading: false,
  user: null
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActions
): State {
  switch (action.type) {

    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        isLoading: false,
        user
      };

    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        authError: action.payload,
        isLoading: false,
        user: null
      };

    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      };

    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      }

    case AuthActions.LOGOUT:
      return {
        ...state,
        authError: null,
        isLoading: false,
        user: null
      };

    default:
      return state;
  }
}
