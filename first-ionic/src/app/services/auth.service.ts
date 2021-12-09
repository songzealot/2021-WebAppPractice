import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User, UserNoPw } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    contentType: 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: User;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }

  prepEndPoint(ep) {
    // return 'http://localhost:3000/'+ep;
    // return ep;
    return 'https://wa2021-swy.herokuapp.com/' + ep;
  }

  registerUser(user): Observable<any> {
    const registerUrl = this.prepEndPoint('users/register');
    return this.http.post(registerUrl, user, httpOptions);
  }

  authenticateUser(LoginInfo): Observable<any> {
    const loginUrl = this.prepEndPoint('users/authenticate');
    return this.http.post(loginUrl, LoginInfo, httpOptions)
  }

  storeUserData(token: any, user: UserNoPw) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    //localStorage.clear();
  }

  getProfile(): Observable<any> {
    const authToken: any = localStorage.getItem('authToken');
    const httpOptionsP = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + authToken
      })
    }
    const profileUrl = this.prepEndPoint('users/profile');
    return this.http.get(profileUrl, httpOptionsP);
  }

  loggedIn(): boolean {
    const authToken: any = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(authToken);
  }
}
