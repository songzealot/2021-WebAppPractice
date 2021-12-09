import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginInfo } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

import * as forge from 'node-forge';
const pki = forge.pki;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;



  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {
    const login: LoginInfo = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(login).subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('로그인 성공', { cssClass: 'alert-success', timeout: 5000 });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 5000 });
        this.router.navigate(['login']);
      }
    });
  }

  onLoginSignSubmit() {
    const privateKeyPem = localStorage.getItem('privateKey');

    if (!privateKeyPem) {
      this.flashMessage.show('브라우저에 인증서와 개인키 없음', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      this.router.navigate(['login']);
    }

    const privateKey = pki.privateKeyFromPem(privateKeyPem);
    const certPem = localStorage.getItem('cert');
    const cert = pki.certificateFromPem(certPem);
    const username = cert.subject.getField('CN').value;
    const currentTime = new Date().getTime();



    // Signature generation on username, currentTime
    let md = forge.md.sha1.create();
    md.update(username + currentTime, 'utf8');
    const signature = privateKey.sign(md);
    const signatureHex = forge.util.bytesToHex(signature);
    // Easy login request
    const request = {
      username: username,
      currentTime: currentTime,
      signatureHex: signatureHex,
    };

    this.authService.authenticateSignUser(request).subscribe((data) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.userInfo);
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['dashboard']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['login']);
      }
    });
  }

  onQRLoginSignSubmit() {
    this.router.navigate(['qrlogin']);
  }
}
