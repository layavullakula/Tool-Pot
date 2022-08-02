import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faMinusCircle, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.scss']
})
export class PrivilegesComponent implements OnInit {

  loading = true;
  privilegesD: any;

  submitted = false;

  // suggested list;
  userList: any;
  toolsList: any;

  // toggle to add tools and users
  showU = true;

  // icons
  remove = faMinusCircle;
  add = faUserPlus;
  plus = faAdd;

  // add user input
  showInputField = false;

  // selected project
  projectId: string = '';
  projectIndex!: number;


  addUser = new FormGroup({
    username: new FormControl('', [Validators.required])
  })

  constructor(private service: AdminService, private access: LinkService) { }

  async ngOnInit(): Promise<void> {
    this.access.getAccess();

    this.getSuggestedT();
    this.getSuggestedU();
    const s = (await this.service.getPrivileges()).toPromise()
    s.then((data) => {
      this.loading = false;
      this.privilegesD = data;
      // console.log("whole", this.privilegesD);
    })

  }

  getSuggestedT() {
    this.service.getTools()
      .subscribe((data) => {
        let suggestTools = data;
        const to = []
        for (let i = 0; i < suggestTools?.length; i++) {
          const p: string = suggestTools[i].name ? suggestTools[i].name : '';
          to.push(p)
        }
        this.toolsList = to;
      })
  }

  getSuggestedU() {
    this.service.getUsers()
      .subscribe((data) => {
        let suggestUser: any = data;
        const sa = []
        for (let i = 0; i < suggestUser?.length; i++) {
          const s: string = suggestUser[i].email ? suggestUser[i].email : '';
          sa.push(s)
        }
        this.userList = sa;
      })
  }


  // form to add user to project
  onSubmit() {
    console.log("value", this.addUser.value);

    this.submitted = true;

    if (this.addUser.valid) {
      if (this.showU) {
        const prevData = this.privilegesD[this.projectIndex].pTeam
        prevData == undefined ? [this.addUser.value.username] : prevData.push(this.addUser.value.username)
        this.service.postPrivilegesU(this.projectId, prevData)
          .subscribe(data => {
            this.addUser.reset()
            this.showInputField = !this.showInputField;
            this.loading = true;
            this.ngOnInit()
          })
      } else {
        const prevData = this.privilegesD[this.projectIndex].pTools
        prevData == undefined ? [this.addUser.value.username] : prevData.push(this.addUser.value.username)
        console.log("add tool data", this.projectId, prevData);

        this.service.postPrivilegesT(this.projectId, prevData)
          .subscribe(data => {
            this.addUser.reset()
            this.showInputField = !this.showInputField;
            this.loading = true;
            this.ngOnInit()
          })
      }
    }






  }

  removeUser(dat: any, email: any, projectIndex: any) {
    console.log(dat.id, email, projectIndex)

    if (this.showU) {
      const removeUserIndex = this.privilegesD[projectIndex].pTeam.indexOf(email)
      const data = this.privilegesD.filter((eachItem: any) => (eachItem.id === dat.id))

      if (

        window.confirm('Are you sure you want to delete ' + email + ' from ' + dat.pName + ' project ?')

      ) {
        data[0].pTeam.splice(removeUserIndex, 1)
        this.service.postPrivilegesU(dat.id, data[0].pTeam)
          .subscribe(data => {
            this.loading = true;
            this.ngOnInit()
          })
      }


    } else {
      const removeUserIndex = this.privilegesD[projectIndex].pTools.indexOf(email)
      const data = this.privilegesD.filter((eachItem: any) => (eachItem.id === dat.id))
      console.log("tools", data, dat, data[0].pTools)

      if (

        window.confirm('Are you sure you want to delete ' + email + ' from ' + dat.pName + ' project ?')

      ) {
        data[0].pTools.splice(removeUserIndex, 1)
        this.service.postPrivilegesT(dat.id, data[0].pTools)
          .subscribe(data => {
            this.loading = true;
            this.ngOnInit()
          })
      }

    }

  }

  addUserToProject(i: any, j: any) {
    // this.showU = true;
    this.showInputField = true;
    this.projectId = i;
    this.projectIndex = j;

  }

  addToolToProject(i: any, j: any) {
    console.log("add Tool", i, j)
    // this.showU = false;
    this.showInputField = true;
    this.projectId = i;
    this.projectIndex = j;
  }


}
