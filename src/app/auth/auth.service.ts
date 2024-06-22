import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

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
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTImer: any;
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

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

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate),
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      // expiration time in seconds - today time in seconds = expirationDuration
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']).then();
    localStorage.removeItem('userData');
    if (this.tokenExpirationTImer) {
      clearTimeout(this.tokenExpirationTImer);
    }
    this.tokenExpirationTImer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTImer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
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
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
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
