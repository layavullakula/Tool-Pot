import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataTool } from 'echarts';
import { AdminService } from 'src/app/services/admin.service';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-project-tools',
  templateUrl: './project-tools.component.html',
  styleUrls: ['./project-tools.component.scss']
})
export class ProjectToolsComponent implements OnInit {
  clickedId: any;

  // loading
  loading = true;

  tools: any = [];

  // dummy list for filtering
  Tool: any = [];
  dummy: any = [];

  constructor(private route: Router,
    private service: AdminService,
    private access: LinkService) { }

  ngOnInit(): void {
    this.clickedId = parseInt(this.route.url.split('/')[2])

    this.getTools();

    this.access.getAccess()
  }

  getTools() {
    this.service.getParticularUserProject()
      .subscribe((data) => {
        for (let i of data) {
          console.log("id", data, this.clickedId);

          if (i.id === this.clickedId) {

            if (i.Tools) {
              for (let [key, value] of Object.entries(i.Tools)) {
                this.Tool.push(value)
              }
            } else {
              this.loading = false;
            }

          }
        }

        console.log("tools", this.Tool)
        this.getToolsLink();
      })
  }

  getToolsLink() {
    this.service.getTools()
      .subscribe((data) => {
        this.dummy = data;
        this.getPaticularLink();
      })

  }

  getPaticularLink() {
    this.loading = true;
    if (this.dummy && this.Tool) {
      for (let j of this.Tool) {
        this.dummy.filter((data: any, i: Boolean) => {
          if (data.name == j) {
            const dat = {
              id: i,
              name: data.name,
              link: data.link
            }
            this.tools.push(dat);
          }
          // console.log("value", data.name, j, "id", i);
        })
      }

    }
    console.log("===>", this.tools)
    this.loading = false;
  }

}
