import { Component, OnInit } from '@angular/core';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss']
})
export class PagenotfoundComponent implements OnInit {

  constructor(private access: LinkService) { }

  ngOnInit(): void {
    this.access.getAccess();
  }

}
