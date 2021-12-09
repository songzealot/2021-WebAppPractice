import { Component, OnInit } from '@angular/core';
import { UserNoPw } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userString: any;
  userNoPw: UserNoPw;
  name: string;
  token: any;
  privateKey: any;
  cert: any;
  caCert: any;

  constructor() { }

  ngOnInit(): void {
    this.userString = localStorage.getItem('userInfo');
    this.userNoPw = JSON.parse(this.userString);
    this.name = this.userNoPw.name;
    this.token = localStorage.getItem('authToken');
    this.privateKey = localStorage.getItem('privateKey');
    this.cert = localStorage.getItem('cert');
    this.caCert = localStorage.getItem('caCert');
  }

}
