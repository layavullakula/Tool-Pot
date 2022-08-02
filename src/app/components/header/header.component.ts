import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faAdd, faArrowRightFromBracket, faArrowRightToBracket, faHome, faLongArrowAltUp, faPlus, faProjectDiagram, faSearch, faTools, faUsers } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // icons
  add = faPlus;
  search = faSearch;
  home = faHome;
  users = faUsers;

  projects = faProjectDiagram;
  tools = faTools;
  privileges = faAdd;

  logout = faArrowRightFromBracket;

  searchForm = new FormGroup({
    search: new FormControl('',)
  })

  constructor(private Auth: LoginService,
    private router: Router,) { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.searchForm.value);

  }

  Logout() {
    this.Auth.logout()
    this.router.navigate(['login'])
  }

  profileA() {
    this.router.navigate(['profile/account'])
  }

  homeN() {
    this.router.navigate([''])
  }

}
