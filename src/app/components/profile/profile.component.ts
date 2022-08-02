import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { faAngleRight, faAngleDown, faEdit } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  loading = true;

  imgLoading = false;

  uid$: any;

  showAcc = false;
  showCP = false;

  // icons
  right = faAngleRight;
  down = faAngleDown;
  edit = faEdit;

  // profile edit
  editMode = false;

  // profile data
  profile: any;

  constructor(private Auth: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private service: ProfileService,) {

  }

  async ngOnInit() {
    // this.getAccess();
    this.Auth.getAccess();
    this.profile = await this.getUserProfileData();
    console.log("Profile data", this.profile)
    this.loading = false;

  }

  async getUserProfileData(): Promise<any> {
    return (await this.service.getUserData()).toPromise()
  }

  openAccount() {
    this.router.navigate(['account'], { relativeTo: this.route });
    this.showAcc = !this.showAcc;
  }

  openPswd() {
    this.router.navigate(['change-password'], { relativeTo: this.route });
    this.showCP = !this.showCP;
  }

  Logout() {
    this.Auth.logout()
    this.router.navigate(['login'])
  }

  profileDpUpload(event: any) {
    this.imgLoading = true;
    console.log("event", event.target.files)
    this.service.uploadImg(event.target.files[0])
      // .pipe()
      .subscribe((data) => {

        console.log("image upload url", data)
        const dat = {
          'Name': this.profile.Name,
          'email': this.profile.email,
          'Ph': this.profile.Ph,
          'Url': data
        }
        this.service.uploadImgUrl(dat)
          .then((data) => {
            data.subscribe((data) => {
              console.log("done i think", data);
              this.imgLoading = false;
              this.ngOnInit()
            })
          }, (err) => {
            this.imgLoading = false;
            console.log("err", err);
          })
      })
  }




}
