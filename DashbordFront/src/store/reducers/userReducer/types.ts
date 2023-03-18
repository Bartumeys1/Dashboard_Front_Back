export interface UserState{
    user: any,
    message: null | string,
    loading: boolean,
    error: null | string
    isAuth: boolean,
    allUsers: [],
    currentUser: any
}

export enum UserActionTypes{
    START_REQUEST = "START_REQUEST",
    LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
    LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",
    REGISTRATION_USER_SUCCESS = "REGISTRATION_USER_SUCCESS",
    REGISTRATION_USER_ERROR = "REGISTRATION_USER_ERROR",
    CHANGE_USER_PROFILE_ERROR = "CHANGE_USER_PROFILE_ERROR",
    FORGOT_USER_PASSWORD_SUCCESS = "FORGOT_USER_PASSWORD_SUCCESS",
    FORGOT_USER_PASSWORD_ERROR = "FORGOT_USER_PASSWORD_ERROR",
    SERVER_USER_ERROR = "SERVER_USER_ERROR",
    SELECT_CURRENT_USER ="SELECT_CURRENT_USER",
    LOGOUT_USER = "LOGOUT_USER",
    ALL_USERS_LOADED = "ALL_USERS_LOADED"
}

interface LOGOUT_USER{
    type: UserActionTypes.LOGOUT_USER
}

interface SelectCurrentUser{
    type: UserActionTypes.SELECT_CURRENT_USER,
    payload:any
}

interface ForgotUserPasswordSuccessAction{
    type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
    payload: any
}

interface ForgotUserPasswordErrorAction{
    type: UserActionTypes.FORGOT_USER_PASSWORD_ERROR,
    payload: any
}

interface StartRequestAction{
    type:UserActionTypes.START_REQUEST,
}

interface LoginUserSuccessAction{
    type:UserActionTypes.LOGIN_USER_SUCCESS
    payload: any
}

interface LoginUserErrorAction{
    type:UserActionTypes.LOGIN_USER_ERROR
    payload: any
}

interface RegistrationUserSuccessAction{
    type:UserActionTypes.REGISTRATION_USER_SUCCESS
    payload: any
}

interface RegistrationUserErrorAction{
    type:UserActionTypes.REGISTRATION_USER_ERROR
    payload: any
}


interface ChangeUserProfileErrorAction {
    type:UserActionTypes.CHANGE_USER_PROFILE_ERROR
    payload: any
}

interface ServerUserErrorAction{
    type: UserActionTypes.SERVER_USER_ERROR,
    payload: any
}

interface AllUsersLoadedAction{
    type: UserActionTypes.ALL_USERS_LOADED,
    payload: any
}

export type UserActions = LOGOUT_USER 
| ForgotUserPasswordErrorAction 
| ForgotUserPasswordSuccessAction 
| LoginUserErrorAction
| LoginUserSuccessAction
| RegistrationUserSuccessAction
| RegistrationUserErrorAction  
| ChangeUserProfileErrorAction
| StartRequestAction 
| ServerUserErrorAction 
| SelectCurrentUser
| AllUsersLoadedAction;