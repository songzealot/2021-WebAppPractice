import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor() { }
  user: any;
  userString: string;
  name: string;
  token: string;
  ngOnInit() {
    if (localStorage.getItem('userInfo') != null) {
      this.userString = localStorage.getItem('userInfo');
      this.user = JSON.parse(this.userString);
      this.name = this.user.name;
    }
    if (localStorage.getItem('authToken') != null) {
      this.token = localStorage.getItem('authToken');
    }

  }

}
