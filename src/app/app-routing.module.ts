import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminComponent } from './components/admin/admin.component';
import { PrivilegesComponent } from './components/admin/privileges/privileges.component';
import { ProjectsComponent } from './components/admin/projects/projects.component';
import { ToolsComponent } from './components/admin/tools/tools.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AccountComponent } from './components/profile/account/account.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { ProjectToolsComponent } from './components/user/user-projects/project-tools/project-tools.component';
import { UserProjectsComponent } from './components/user/user-projects/user-projects.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotComponent },
  { path: '', component: HomeComponent },

  {
    path: 'user', component: UserComponent, children: [
      { path: "dashboard", component: UserHomeComponent },
      { path: 'project', component: UserProjectsComponent },
      { path: ':id', component: ProjectToolsComponent, },
    ]
  },

  {
    path: "profile", component: ProfileComponent,
    children: [
      { path: "account", component: AccountComponent },
      { path: "change-password", component: ChangePasswordComponent },
    ]
  },
  {
    path: 'admin', canActivate: [AuthGuard], component: AdminComponent, children: [
      { path: "dashboard", component: AdminHomeComponent },
      { path: "projects", component: ProjectsComponent },
      { path: "users", component: UsersComponent },
      { path: "tools", component: ToolsComponent },
      { path: "privileges", component: PrivilegesComponent },
    ]
  },
  { path: 'not-auth', component: NotAuthorizedComponent },

  { path: 'page-not-found', component: PagenotfoundComponent },
  { path: '**', redirectTo: 'page-not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
