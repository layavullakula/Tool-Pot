import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  url = 'https://hello-dd55c-default-rtdb.firebaseio.com/'
  useremail = localStorage.getItem('email');

  constructor(private http: HttpClient, private router: Router) { }

  getLink() {
    return this.http.get(this.url + 'Link.json')
      .pipe(
        map(
          (data: any) => {
            const p = [];
            for (const i in data) {
              if (data.hasOwnProperty(i)) {
                p.push({ ...data[i], key: i })
              }
            }
            // console.log(p)
            return p;
          }
        )
      )
  }

  getParticularUserProject() {
    return this.http.get(this.url + 'projectData.json')
      .pipe(
        map(
          (data: any) => {
            let k = 1;
            const userD: any[] = []
            for (const i in data) {
              for (const j in data[i].teamMem) {
                // console.log("==>", data[i].teamMem[j], this.useremail)
                if (data[i].teamMem[j] === this.useremail) {
                  userD.push({ ...data[i], id: k })
                  k += 1
                }
              }
            }
            return userD
          }
        )
      )
  }

  getAccess() {
    const s = localStorage.getItem('user')
    if (s === null) {
      this.router.navigate(['/login']);
    }
  }
}
