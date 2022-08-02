import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

// fortawesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// charts
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './components/admin/admin.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
// import { NotAuthComponent } from './components/not-auth/not-auth.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserComponent } from './components/user/user.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { UsersComponent } from './components/admin/users/users.component';
import { ToolsComponent } from './components/admin/tools/tools.component';
import { ProjectsComponent } from './components/admin/projects/projects.component';
import { PrivilegesComponent } from './components/admin/privileges/privileges.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserProjectsComponent } from './components/user/user-projects/user-projects.component';
import { ProjectToolsComponent } from './components/user/user-projects/project-tools/project-tools.component';
import { SideHeaderComponent } from './components/side-header/side-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingPageComponent } from './shared/loading-page/loading-page.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AccountComponent } from './components/profile/account/account.component';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    FooterComponent,
    ForgotComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NotAuthorizedComponent,
    PagenotfoundComponent,
    ProfileComponent,
    UserComponent,
    AdminHomeComponent,
    UsersComponent,
    ToolsComponent,
    ProjectsComponent,
    PrivilegesComponent,
    UserHomeComponent,
    UserProjectsComponent,
    ProjectToolsComponent,
    SideHeaderComponent,
    LoadingPageComponent,
    LoadingSpinnerComponent,
    LoadingComponent,
    AccountComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
