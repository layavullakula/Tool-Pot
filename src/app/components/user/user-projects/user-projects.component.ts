import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {
  project: any = [];
  loading = true;

  error: any;

  constructor(private service: LinkService, private route: Router) { }

  async ngOnInit(): Promise<any> {
    this.loading = true;
    const s = (await this.service.getParticularUserProject()).toPromise()
    s.then((data) => {
      this.project = data;
      this.loading = false;

    }, (err) => {
      console.log("err", err)
      this.error = err.statusText;
      this.loading = false;
    })

    this.service.getAccess();
  }

  retry() {
    this.ngOnInit();
  }

  navigateToTools(id: any) {
    console.log("id", id)
    this.route.navigate([`user/${id}`])
  }


}
