import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;

  pswdError = false;

  formss = new FormGroup({
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  // matcher = new MyErrorStateMatcher();

  loading = false;
  errorMsg: any = null;

  constructor(private service: LoginService,
    private router: Router) {

  }

  ngOnInit(): void {
    const s = localStorage.getItem('user')

    console.log("login");

    if (s !== null) {
      console.log("came to home");

      this.router.navigate(['/'])

    } else {
      console.log("in login");

      this.router.navigate(['/login'])
    }
  }

  onLogin() {
    this.pswdError = false;
    this.loading = true;
    this.submitted = true;
    var email: any = this.formss.value.emailFormControl;
    var password = this.formss.value.passwordFormControl;

    if (this.formss.valid) {
      this.service.login(email, password)
        .then((data) => {
          this.loading = false;
          this.submitted = false;
          this.router.navigate(['/']);
          const s: any = data.user?.uid;
          localStorage.setItem('user', s);
          localStorage.setItem('email', email);
          // console.log("gate", data.user?.uid, data.user?.uid == 'OUX9WcIXBeT7jyxmBiv65tgaSbv1');
          // if (s == 'mN1XpgmzpENjE8DQRSrvBKgR81y2') {
          //   console.log("hi");
          // }
          // console.log("out");

        }, (error) => {
          this.loading = false;
          this.errorMsg = JSON.stringify(error.code.replace('auth/', ''));
        })
    } else {
      this.pswdError = true;
    }
  }

}
