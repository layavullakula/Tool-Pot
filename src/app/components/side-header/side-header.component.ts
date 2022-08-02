import { Component, OnInit } from '@angular/core';
import { faAdd, faCaretDown, faCircleUser, faDashboard, faProjectDiagram, faTools, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-side-header',
  templateUrl: './side-header.component.html',
  styleUrls: ['./side-header.component.scss']
})
export class SideHeaderComponent implements OnInit {
  manage = false;

  profileData = {
    Url: null,
    Name: ''
  }

  admin = this.auth.admin;

  // icons
  faGoogle = faGoogle;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  profile = faCircleUser;

  dropdown = faCaretDown;
  dashboard = faDashboard;
  users = faUsers;
  projects = faProjectDiagram;
  tools = faTools;
  privileges = faAdd;

  constructor(private auth: LoginService, private service: ProfileService) { }

  async ngOnInit() {
    this.profileData = await this.getUserProfileData();
    console.log(this.profileData);

  }

  async getUserProfileData(): Promise<any> {
    return (await this.service.getUserData()).toPromise()
  }

}
