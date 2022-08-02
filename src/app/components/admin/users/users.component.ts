import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faBell, faMessage, faPhone, faTrashAlt, faUser, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { LinkService } from 'src/app/services/link.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loading = true;
  editId: any;

  submitted = false;

  constructor(private service: AdminService,
    private addService: LoginService,
    private access: LinkService) { }
  usersList: any = []

  error: any

  // icons
  edit = faUserEdit;
  bell = faBell;
  trash = faTrashAlt;
  add = faAdd;
  phone = faPhone;
  mail = faMessage;
  name = faUser;

  // popup
  showP = false;

  // edit Mode
  editMode = false;


  async ngOnInit(): Promise<void> {
    const s = (await this.getUsers()).toPromise();
    s.then((data) => {
      this.usersList = data;
      this.loading = false;
      this.showP = false;
    })

    this.access.getAccess()

  }

  addUser = new FormGroup({
    first_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    ph: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required)
  })

  async getUsers() {
    return await this.service.getUsers()
    // .subscribe((data) => {
    //   this.usersList = data;
    //   this.loading = false;
    //   this.showP = false;
    // })

  }

  onClose() {
    this.showP = false;
  }

  addU() {
    this.showP = !this.showP
    this.addUser.reset()
    this.editMode = false;
  }

  async addAddDetails() {
    this.submitted = true;
    console.log("==><", this.addUser.value, this.editMode, this.addUser.valid);




    this.loading = true;
    if (this.editMode) {
      console.log("editMode", this.addUser.value);
      const d = {
        'Name': this.addUser.value.first_name,
        'Ph': this.addUser.value.ph,
        'email': this.addUser.value.email,
        'gender': this.addUser.value.gender,
      }

      await this.service.updateUser(this.editId, d)
        .subscribe((data) => {
          this.submitted = false;
          console.log("edited successfully", data);
          this.ngOnInit();
          this.addUser.reset();
        })

    } else {
      // console.log("add", this.editMode);
      if (this.addUser.valid) {

        console.log("came");




        // this.addUser.reset();
        console.log(this.addUser.value);
        let uid: any = ''
        let id: any = '';

        const user = {
          'Name': this.addUser.value.first_name,
          'Ph': this.addUser.value.ph,
          'email': this.addUser.value.email,
          'Url': '',
          'Gender': this.addUser.value.gender,
          'NoP': 0,
        }

        let email = this.addUser.value.email
        let pswd = this.addUser.value.password


        await this.addService.register(email, pswd)
          .then((data) => {
            uid = data?.user?.uid;
            console.log("uid", uid);

          })

        await this.addService.realDbRegister(user)
          .then((data: any) => {
            data.subscribe((data: any) => {
              if (data.hasOwnProperty('name')) {
                id = data.name;
                console.log("id", id);

                if (uid && id) {
                  console.log('came inside')
                  this.link(uid, id)
                  this.submitted = false;
                  this.addUser.reset();

                }
              }
            })

          })
      }
    }


  }

  editUser(data: any) {
    this.editMode = true;
    this.editId = data.id;
    const d = {
      first_name: data.Name,
      email: data.email,
      ph: data.Ph,
      gender: data.Gender,
    }
    this.showP = true;
    this.addUser.patchValue(d);

    console.log(this.addUser.value);

  }

  deleteUser(d: any) {

    // console.log("id of User", id);
    if (

      window.confirm('Are you sure you want to delete ' + d.Name + ' ?')

    ) {
      this.loading = true;
      this.service.deleteUser(d.id)
        .subscribe(async (data) => {
          console.log(data);
          await this.addService.deletUser();
          this.loading = false;
          this.ngOnInit();
        })
    }
  }

  link(uid: any, id: any) {
    const s = {
      uid: uid,
      id: id
    }
    this.addService.linkDb(s)
      .subscribe((data) => {
        console.log("<=====>", data);
        this.ngOnInit();

      })
  }

}
