import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  name: string

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.name = profile.user.name;
    }, (err) => {
      console.log(err);
      return false;
    });

  }

  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }
}
