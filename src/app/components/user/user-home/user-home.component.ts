import { Component, OnInit } from '@angular/core';
import { faProjectDiagram, faTools } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/services/admin.service';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {
  ProjectsCount = 0;
  ToolsCount = 0;

  // icons
  project = faProjectDiagram;
  tool = faTools

  constructor(private service: AdminService, private access: LinkService) { }

  ngOnInit(): void {
    this.getProjects();

    this.access.getAccess();
  }

  getProjects() {
    this.service.getParticularUserProject().subscribe((data) => {
      console.log("===>", data);

      if (data) {
        this.ProjectsCount = data.length;
        data.map((each) => {
          if (each.Tools) {
            this.ToolsCount += each.Tools.length;
          }
        })
      } else {
        this.ProjectsCount = 0;
        this.ToolsCount = 0;
      }
    }
    )
  }

}
