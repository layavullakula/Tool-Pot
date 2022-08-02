import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { LinkService } from 'src/app/services/link.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @Input() editMode: Boolean = false;
  password: any = 'password'
  p = '*'
  passwordChange = '';
  loading = true;

  profile: any = {
    'Name': '',
    'email': '',
    'Ph': '',
  };

  // icon
  edit = faPencil

  // editMode = false;

  constructor(private service: ProfileService, private access: LinkService) { }

  addForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    Ph: new FormControl('', Validators.required)
  })

  async ngOnInit() {
    this.profile = await this.getUserProfileData();
    this.loading = false;

    this.access.getAccess();
  }

  async getUserProfileData(): Promise<any> {
    return (await this.service.getUserData()).toPromise()
  }

  updateDate() {
    this.loading = true;
    console.log(this.addForm.value);
    const data = {
      'Name': this.addForm.value.Name,
      'email': this.addForm.value.email,
      'Ph': this.addForm.value.Ph,
      'Url': this.profile.Url,
    }
    this.service.updateUseData(data)
      .then((data) => {
        console.log("done", data);
        data.subscribe((data) => {
          this.ngOnInit();

        })
      }, (err) => {
        console.log('err', err);
        this.loading = false;
      })

  }

  edi() {
    this.editMode = !this.editMode
    console.log("data", this.profile.Name)
  }

}
