import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faAdd, faLink, faPen, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {

  loading = true;
  tools: any;

  // form submit
  submitted = false;

  //error
  errorMsg: any;

  // form
  showP = false;

  // edit data
  editMode = false;
  editId: any;

  // icons
  plus = faPlus;
  edit = faPen;
  trash = faTrashAlt
  add = faAdd;
  toolLink = faLink;

  // form to add tool
  addTool = new FormGroup({
    name: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required)
  })

  constructor(private service: AdminService, private access: LinkService) { }

  async ngOnInit(): Promise<void> {
    this.access.getAccess();

    const s = (await this.service.getTools()).toPromise();
    s.then((data) => {
      this.loading = false;
      this.tools = data;
      console.log("tools", this.tools);
    })
  }

  addT() {
    this.showP = !this.showP;
    this.addTool.reset()
    this.editMode = false;
  }

  // pop up close
  onClose() {
    this.showP = false;
  }

  // pop up submit button
  addTools() {
    this.submitted = true;
    if (this.addTool.valid) {
      this.loading = true;
      console.log(this.addTool)
      if (this.editMode) {
        this.service.patchTool(this.editId, this.addTool.value)
          .subscribe((data) => {
            this.ngOnInit()
            this.showP = false;
            this.loading = false;

            console.log("update", data);
          })
      } else {
        this.service.postTool(this.addTool.value)
          .subscribe((data) => {
            this.ngOnInit()
            this.showP = false;
            this.loading = false;
            console.log("done", data);
          }, (error) => {
            this.loading = false;
            console.log("error", error);
          })
      }
    }


  }

  // edit tool
  editTool(i: any) {
    this.editMode = true;
    this.editId = i.id;

    this.showP = !this.showP;

    const data = {
      name: i.name,
      link: i.link
    }

    this.addTool.patchValue(data);

  }

  // delete tool
  deleteTool(i: any) {
    if (

      window.confirm('Are you sure you want to delete ' + i.name + ' ?')

    ) {
      this.loading = true;
      this.service.deleteTool(i.id)
        .subscribe((data) => {
          this.ngOnInit();
          console.log("deleted", data);
          this.loading = false;
        })
    }
  }


}
