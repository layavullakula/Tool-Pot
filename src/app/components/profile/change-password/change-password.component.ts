import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { LinkService } from 'src/app/services/link.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {
  changePswd: FormGroup;
  submit = false;

  // loading
  loading = true;

  // icons
  faEye = faEye;
  faEyeSlash = faEyeSlash

  // icon variables
  eye1 = true;
  eye2 = false;
  eye3 = false;

  // change password success 
  success: any = '';

  // error in change password
  fail: any = '';

  constructor(private service: LoginService, private FormBuilder: FormBuilder, private access: LinkService) {
    this.changePswd = this.FormBuilder.group({
      currentPswd: new FormControl(null, [Validators.minLength(8), Validators.required]),
      newPswd: new FormControl(null, [Validators.minLength(8), Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]),
      confirmPswd: new FormControl(null, [Validators.minLength(8), Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)],),
    },
      {
        validators: this.MustMatch('newPswd', 'confirmPswd'),
      }
    )
  }




  ngOnInit(): void {
    this.loading = false;

    this.access.getAccess();
  }


  MustMatch(newPswd: string, confirmPswd: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[newPswd];
      const confirmPasswordControl = formGroup.controls[confirmPswd];
      if (confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['mustMatch']) {
        return;
      }
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  get details() {
    return this.changePswd.controls;
  }

  onSubmit() {
    this.loading = true;
    console.log(this.changePswd.value)
    this.submit = true;

    this.service.reset(this.changePswd.value.currentPswd, this.changePswd.value.newPswd)
      .then((data) => {
        if (data == undefined) {
          console.log("confirm password success ", JSON.stringify(data));
          this.success = 'Password Changed Successfully ';
          this.loading = false;
        } else {
          console.log("error occured {}");
          this.fail = 'Check your Current Password or Network'
          this.loading = false;
        }

      })

  }

}
