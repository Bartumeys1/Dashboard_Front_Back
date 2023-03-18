import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {
  login,
  forgotPassword,
  removeTokens,
  getAllUsers,
  registrateUser,
  changeUserProfile,
  logout,
  changePassword,
  removeUser,
  updateUser,
} from "../../../services/api-user-service";
import jwtDecode from "jwt-decode";
import {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getrefreshToken,
} from "../../../services/api-user-service";

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await login(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.LOGIN_USER_ERROR,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {
        const { accessToken, refreshToken, message } = data.response;

        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        AuthUser(accessToken, message, dispatch);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const ForgotPassword = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await forgotPassword(email);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
          payload: data.response,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const ChangePassword = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await changePassword(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.LOGIN_USER_ERROR,
          payload: response.message,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
          payload: response.message,
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const LogOut = (userId: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    const data = await logout(userId);
    const { response } = data;
    if (response.isSuccess) {
      removeTokens();
      dispatch({
        type: UserActionTypes.LOGOUT_USER,
      });
    }
  };
};

export const SetCurrentUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: UserActionTypes.SELECT_CURRENT_USER,
      payload: user,
    });
  };
};

export const AuthUser = (
  token: string,
  message: string,
  dispatch: Dispatch<UserActions>
) => {
  const decodedToken = jwtDecode(token) as any;
  dispatch({
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: {
      message,
      decodedToken,
    },
  });
};

export const GetAllUsers = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await getAllUsers();
      const { response } = data;
      if (response.isSuccess) {
        dispatch({
          type: UserActionTypes.ALL_USERS_LOADED,
          payload: response,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const RegistrationUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await registrateUser(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.REGISTRATION_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.REGISTRATION_USER_SUCCESS,
          payload: data.response,
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const ChangeUserProfile = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await changeUserProfile(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.CHANGE_USER_PROFILE_ERROR,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {
        const { accessToken, refreshToken, message } = data.response;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        AuthUser(accessToken, message, dispatch);
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const UpdateUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await updateUser(user);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.CHANGE_USER_PROFILE_ERROR,
          payload: data.response.message,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.REGISTRATION_USER_SUCCESS,
          payload: data.response.message,
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export  const RemoveUser =(email: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const data = await removeUser(email);
      const { response } = data;
      if (!response.isSuccess) {
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: data.response,
        });
        toast.error(response.message);
      } else {
        dispatch({
          type: UserActionTypes.REGISTRATION_USER_SUCCESS,
          payload: data.response,
        });
        toast.success(response.message);
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};
