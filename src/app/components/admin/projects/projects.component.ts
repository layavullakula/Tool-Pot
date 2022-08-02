import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faPen, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private service: AdminService, private access: LinkService) { }

  // loading
  loading = true;

  projectsList: any = [];
  profileList: any = [];

  // form submit
  submitted = false;

  // popup
  showP = false;

  // edit project
  editMode = false;
  editId: any;

  // error
  error: any;

  // icons
  add = faAdd;
  edit = faPen;
  trash = faTrashAlt;
  user = faUser;

  addProject = new FormGroup({
    project_name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required)
  })

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.access.getAccess();
    // const s = (await this.service.getProjects()).toPromise();
    // s.then((data) => {
    //   this.loading = false;
    //   this.projectsList = data;
    //   // for(let i)
    //   console.log(this.projectsList);
    // })

    this.service.getProfiles().subscribe((data) => {
      this.profileList = data;
    })

    this.getWholeData()
  }

  getWholeData() {
    this.loading = true;
    let d: any = []
    this.service.getProjects()
      .subscribe((data) => {
        const final = data;
        for (let i of data) {

          if (i.teamMem) {
            for (let j of i.teamMem) {
              const st = this.profileList.filter((data: any) => {
                if (data.email == j) {
                  const s = {
                    email: data.email,
                    url: data.url
                  }
                  if (d.length < 5) {
                    d.push(s);
                  }

                }
              })
            }
            i.team = d;
            console.log("data", d);
            d = []

            // return d;
          }

        }
        this.projectsList = data;
        this.loading = false;
        console.log("finally", data)

      })
  }

  addP() {
    this.showP = !this.showP;
    this.addProject.reset()
    this.editMode = false;
  }

  // close pop up
  onClose() {
    this.showP = false;
  }

  // add project details
  addProjectDetails() {
    this.submitted = true;
    console.log(this.addProject.value);

    if (this.addProject.valid) {
      this.loading = true;
      if (this.editMode) {
        this.service.putProject(this.editId, this.addProject.value)
          .subscribe((data) => {
            this.ngOnInit();
            this.showP = false;
            this.loading = false;
            this.submitted = false;
          })
      } else {
        const data = {
          'ProjectName': this.addProject.value.project_name,
          'ProjectDescription': this.addProject.value.description,
          'StartDate': this.addProject.value.start_date,
          'EndDate': this.addProject.value.end_date,
          'Status': this.addProject.value.status
        }
        this.service.postProject(data)
          .subscribe((data) => {
            this.ngOnInit()
            this.showP = false;
            console.log(data);
          }, (err) => {
            this.ngOnInit()
            this.error = err;
            this.loading = false;
            this.submitted = false;
          })
      }
    }



  }

  // store edit data
  editProject(i: any) {
    this.editMode = true;
    this.editId = i.id;
    console.log("data", i);

    const data = {
      project_name: i.ProjectName,
      description: i.ProjectDescription,
      start_date: i.StartDate,
      end_date: i.EndDate,
      status: i.Status
    }

    this.addProject.patchValue(data);

    this.showP = true;
  }

  // delete project
  deletProject(i: any) {
    if (

      window.confirm('Are you sure you want to delete ' + i.ProjectName + ' ?')

    ) {
      this.loading = true;
      this.service.deleteProject(i.id)
        .subscribe((data) => {
          this.ngOnInit()
        })
    }
  }


}
