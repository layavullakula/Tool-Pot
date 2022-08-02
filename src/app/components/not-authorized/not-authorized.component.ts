import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {

  constructor(private access: LinkService) { }

  ngOnInit(): void {
    this.access.getAccess();
  }

}
