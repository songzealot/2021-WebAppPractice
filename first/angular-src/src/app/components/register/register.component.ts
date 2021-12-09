import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  name: string;
  email: string;
  username: string;
  password: string;
  pwchk: string;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit(): any {
    if (this.password !== this.pwchk) {
      this.flashMessage.show("패스워드 불일치",
        { cssClass: 'alert-danger', timeout: 3000 }
      );
      return false;
    }
    if (!this.validateService.validateEmail(this.email)) {
      this.flashMessage.show("이메일 형식 불일치",
        { cssClass: 'alert-danger', timeout: 3000 }
      );
      return false;
    }

    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("모든 필드 입력 바람",
        { cssClass: 'alert-danger', timeout: 3000 }
      );
      return false;
    }

    this.flashMessage.show("입력 정보 검증 완료",
      { cssClass: 'alert-success', timeout: 3000 }
    );

    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000
        });
        this.router.navigate(['/register']);
      }
    })

  }

}
