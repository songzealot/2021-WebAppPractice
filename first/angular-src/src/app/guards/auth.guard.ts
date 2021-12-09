import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private flashMessage: FlashMessagesService
    ) { }

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.flashMessage.show("로그인하세요", { cssClass: "alert-danger", timeout: 5000 });
            this.router.navigate(['login']);
            return false;
        }
    }
}