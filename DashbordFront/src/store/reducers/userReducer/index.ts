import { UserState, UserActions, UserActionTypes } from "./types";

const initialState: UserState = {
  user: {},
  message: null,
  loading: false,
  error: null,
  isAuth: false,
  allUsers: [],
  currentUser:{}
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionTypes.LOGIN_USER_ERROR:
        return {...state, loading: false, message: action.payload.message}
    case UserActionTypes.REGISTRATION_USER_SUCCESS:    
        return{...state , loading : false , message:action.payload.message}
    case UserActionTypes.REGISTRATION_USER_ERROR:    
        return{...state , loading:false}
        case UserActionTypes.CHANGE_USER_PROFILE_ERROR:    
        return{...state , loading:false , message: action.payload.message}
    case UserActionTypes.SERVER_USER_ERROR:
      return { ...state, loading: false, message: action.payload.message };
      case UserActionTypes.SELECT_CURRENT_USER:
        return{
          ...state,
          loading:false,
          currentUser: action.payload
        }
    case UserActionTypes.LOGOUT_USER:
      return {
        isAuth: false,
        loading: false,
        user: null,
        message: null,
        error: null,
        allUsers: [],
        currentUser: {}
      };
    case UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.FORGOT_USER_PASSWORD_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.ALL_USERS_LOADED:
      return {...state, loading: false,  message: action.payload.message, allUsers: action.payload.payload}
    default:
      return state;
  }
};

export default UserReducer;
