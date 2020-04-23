
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { Router } from '@angular/router';

import { ILogin } from '../login/login.model';
import { IUserlogin } from '../login/userlogin.model';


export interface IAuthResponseData {
  status: string;
  email: string;
  userId: string;
  token: string;
  expiresIn: number;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  userLogin: ILogin;

  readonly baseURL = 'http://localhost:3000';

// Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getToken() {

    console.log('service getToken : ', this.getToken);

    return this.token;
  }

  getIsAuth() {
    this.autoAuthUser();  // need to fix this
    console.log('service isAuthenticated : ', this.isAuthenticated);

    return this.isAuthenticated;
  }

  getUserId() {

    console.log('service getUserId : ', this.userId);

    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

    // tslint:disable-next-line: align
/*     private handleAuthentication(
      status: string,
      email: string,
      userId: string,
      token: string,
    ) {

      //const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new IUserlogin(status, email, userId, token);  //expirationDate
      console.log('handleAuthentication : ', user);
      this.user.next(user);
    } */


// POST
postRegister(data): Observable<ILogin> {
  console.log('postRegister :',  this.baseURL + '/register', data);
  return this.http.post<ILogin>(this.baseURL + '/register', data)
/*   .pipe(
    retry(1),
    catchError(this.errorHandl)
  ); */
}

  login(authData) {
    return this.http.post<IAuthResponseData>(this.baseURL + '/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;

      console.log('login : ', response);

  // check if token
      if (token) {

console.log("toke : ", token)

const expiresInDuration = response.expiresIn;
this.setAuthTimer(expiresInDuration);
this.isAuthenticated = true;
this.userId = response.userId;
this.authStatusListener.next(true);

console.log("isAuthenticated : ", this.isAuthenticated)
console.log("userId : ", this.userId)


const now = new Date();
const expirationDate = new Date(
          now.getTime() + expiresInDuration * 1000
        );
console.log('expirationDate :', expirationDate);
this.saveAuthData(token, expirationDate, this.userId);
this.router.navigate(['/']);
      }
    }

    );
    /* .pipe(
      retry(1),
      catchError(this.errorHandl),
      tap(resData => {
        console.log('postLogin response tap :', resData);
        this.handleAuthentication(
          resData.status,
          resData.email,
          resData.userId,
          resData.token,
        );
      })
    ); */
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
// using tokenepire logout user
  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
// save data in localStorage
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

// get user auth token from localStorage
  private getAuthData() {

console.log('getAuthData');

const token = localStorage.getItem('token');
const expirationDate = localStorage.getItem('expiration');
const userId = localStorage.getItem('userId');
if (!token || !expirationDate) {
      return;
    }
return {
      token,
      expirationDate: new Date(expirationDate),
      userId,
    };
  }
}


  // Error handling
/*  private errorHandl(error) {

console.log('errorHandl  error.error.message : ', error.error.message);

let errorMessage = '';
if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
console.log(errorMessage);
return throwError(errorMessage);
 }
} */

