import { Action } from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const SIGNUP_START = '[Auth] Signup Start';
export const SIGNUP = '[Auth] Signup';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const CLEAR_ERROR = '[Auth] Clear Error'
export const LOGOUT = '[Auth] Logout';

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;

    constructor (public payload: {
        email: string,
        userId: string,
        token: string,
        expirationDate: Date
    }) {}
}

export class AutoLogin implements Action {
    readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
// for the error message
    constructor(public payload: string){}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }){}
}

export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
}

export type AuthActions =
  | AuthenticateSuccess
  | LoginStart
  | Logout
  | AutoLogin
  | AuthenticateFail
  | SignupStart
  | ClearError;
    