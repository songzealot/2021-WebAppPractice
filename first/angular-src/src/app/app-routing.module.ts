import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertComponent } from './components/cert/cert.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectComponent } from './components/project/project.component';
import { QrgenComponent } from './components/qrgen/qrgen.component';
import { QrloginComponent } from './components/qrlogin/qrlogin.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamComponent } from './components/team/team.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'team', component: TeamComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'cert', component: CertComponent, canActivate: [AuthGuard] },
  { path: 'qrgen', component: QrgenComponent, canActivate: [AuthGuard] },
  { path: 'qrlogin', component: QrloginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
