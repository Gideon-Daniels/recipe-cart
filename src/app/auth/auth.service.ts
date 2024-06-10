import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPr-HlAWXwxHd9WSfG8TIfDbSOq3hg2ZM',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      )
      .pipe(
        catchError(this.#handleError),
        tap((resData) => {
          this.#handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn, // adding plus converts string into a number
          );
        }),
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPr-HlAWXwxHd9WSfG8TIfDbSOq3hg2ZM',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      )
      .pipe(
        catchError(this.#handleError),
        tap((resData) => {
          this.#handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn, // adding plus converts string into a number
          );
        }),
      );
  }

  #handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
  ) {
    // newDate(date in seconds since the beginning + expired date in milliseconds(multiplied by 1000) )
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
  }

  #handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'unknown error occurred';

    if (!errorRes.error && !errorRes.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'Username or password is invalid';
        break;
      default:
        errorMessage = 'unknown error occurred';
    }

    return throwError(() => errorMessage);
  }
}
