import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from '../auth.service';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (
    expiresIn: number,
    email: string,
    userId: string ,
    token: string
    ) => {
       const expirationDate = new Date(
         new Date().getTime() + expiresIn * 1000
       );
       const user = new User(email, userId, token, expirationDate);
       localStorage.setItem('userData', JSON.stringify(user))
       return new AuthActions.AuthenticateSuccess({
         email: email,
         userId: userId,
         token: token,
         expirationDate: expirationDate,
       });
}

const handleError = (errorRes: any) => {
      let errorMessage = 'An unknown error occured!';
      if (!errorRes.error || !errorRes.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
      }
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'This password is not correct';
          break;
      }
      return of(new AuthActions.AuthenticateFail(errorMessage));
}

@Injectable()
  export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap((signupAction: AuthActions.SignupStart) => {
            return this.http
              .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                  environment.firebaseAPIKey,
                {
                  email: signupAction.payload.email,
                  password: signupAction.payload.password,
                  returnSecureToken: true,
                }
              )
              .pipe(
                tap(resData => {
                    this.authService.setLogoutTimer(+resData.expiresIn * 1000)
                }),
                map((resData) => {
                  return handleAuthentication(
                    +resData.expiresIn,
                    resData.email,
                    resData.localId,
                    resData.idToken
                  );
                }),
                catchError((errorRes) => {
                  return handleError(errorRes);
                })
              );
        }),      
    )

    @Effect()
    authLogin = this.actions$.pipe(
    // filters the actions
        ofType(AuthActions.LOGIN_START),
        switchMap((authData: AuthActions.LoginStart) => {
            return this.http
              .post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
                  environment.firebaseAPIKey,
                {
                  email: authData.payload.email,
                  password: authData.payload.password,
                  returnSecureToken: true,
                }
              )
              .pipe(
                tap((resData) => {
                  this.authService.setLogoutTimer(+resData.expiresIn );
                }),
                map((resData) => {
                  return handleAuthentication(
                    +resData.expiresIn,
                    resData.email,
                    resData.localId,
                    resData.idToken
                  );
                }),
                catchError((errorRes) => {
                  return handleError(errorRes);
                })
              );
        })
    );

    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(AuthActions.AUTO_LOGIN),
        map(() => {
            // retrieve data form local storage
                  const userData: {
                    email: string;
                    id: string;
                    _token: string;
                    _tokenExpirationDate: string;
                  } = JSON.parse(localStorage.getItem('userData'));
                  if (!userData) {
                    return { type: 'DUMMY' };
                  }
                  // create a user based on the retrieved data
                  const loadedUser = new User(
                    userData.email,
                    userData.id,
                    userData._token,
                    new Date(userData._tokenExpirationDate)
                  );
                    // check the validity of the token
                  if (loadedUser.token) {
                     const expirationDuration =
                       new Date(userData._tokenExpirationDate).getTime() -
                       new Date().getTime();
                    this.authService.setLogoutTimer(expirationDuration);
                    return new AuthActions.AuthenticateSuccess({
                        email: loadedUser.email,
                        userId: loadedUser.id,
                        token: loadedUser.token,
                        expirationDate: new Date(userData._tokenExpirationDate),
                      })
                    
                 }
                 return { type: 'DUMMY'}
            })
    )

    @Effect({ dispatch: false })
    authRedirect = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
            this.router.navigate(['/']);
        })
    );

    authLogout = this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
            this.authService.clearLogoutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
    }))

// add the dollar sign after actions$ to indicate that it is an observable
    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService) {}
}