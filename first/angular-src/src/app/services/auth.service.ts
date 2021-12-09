import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User, UserNoPw, CertReq } from '../models/user';

import * as forge from 'node-forge';
const pki = forge.pki;

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
    // 로컬 개발
    // return 'http://localhost:3000/' + ep;
    // 서버 배포
    return ep;
  }

  registerUser(user): Observable<any> {
    const registerUrl = this.prepEndPoint('users/register');
    return this.http.post(registerUrl, user, httpOptions);
  }

  authenticateUser(LoginInfo): Observable<any> {
    const loginUrl = this.prepEndPoint('users/authenticate');
    return this.http.post(loginUrl, LoginInfo, httpOptions)
  }

  authenticateSignUser(request): Observable<any> {
    const loginUrl = this.prepEndPoint('users/authenticateSign');
    return this.http.post(loginUrl, request, httpOptions);
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
    let authToken: any = localStorage.getItem('authToken');
    const httpOptionsP = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken
      })
    }
    const profileUrl = this.prepEndPoint('users/profile');
    return this.http.get(profileUrl, httpOptionsP);
  }

  loggedIn(): boolean {
    let authToken: any = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(authToken);
  }

  getList(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptionsP = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken
      })
    }
    const listUrl = this.prepEndPoint('users/list');
    return this.http.get<any>(listUrl, httpOptionsP);
  }

  certRequest(request, keySize): Observable<any> {
    // Key generation
    let keyPair = pki.rsa.generateKeyPair(keySize);
    let publicKey = keyPair.publicKey;
    let privateKey = keyPair.privateKey;
    let publicKeyPem = pki.publicKeyToPem(publicKey);
    let privateKeyPem = pki.privateKeyToPem(privateKey);
    // Storing private key
    localStorage.setItem('privateKey', privateKeyPem);
    // Certificate request. UTF-8 encoding.
    const req: CertReq = {
      country: forge.util.encodeUtf8(request.country),
      state: forge.util.encodeUtf8(request.state),
      locality: forge.util.encodeUtf8(request.locality),
      organization: forge.util.encodeUtf8(request.organization),
      orgUnit: forge.util.encodeUtf8(request.orgUnit),
      common: request.common, // common = username should be English
      publicKey: publicKeyPem,
    };
    const certUrl = this.prepEndPoint('users/cert');
    return this.http.post(certUrl, req, httpOptions);
  }

  storeCert(cert, caCert) {
    localStorage.setItem('cert', cert);
    localStorage.setItem('caCert', caCert);
  }

}
