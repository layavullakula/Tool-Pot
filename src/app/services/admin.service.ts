import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url = 'https://hello-dd55c-default-rtdb.firebaseio.com/projectData';
  toolUrl = 'https://hello-dd55c-default-rtdb.firebaseio.com/toolData';

  // projectNo = 0;

  // editData: any //= {
  // 'id': '',
  //   'project_name': '',
  //   'description': '',
  //   'start_date': '',
  //   'end_date': '',
  //   'status': ''
  // }
  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get(this.url + '.json')
      .pipe(
        map((data: any) => {
          const p = [];
          for (const i in data) {
            if (data.hasOwnProperty(i)) {
              // console.log(data[i].teamMem)
              // this.getProfiles(data[i].teamMem)
              p.push({ ...data[i], id: i })
            }
          }
          return p;
        })
      )
  }

  getPendingP() {
    return this.http.get(this.url + '.json')
      .pipe(
        map((data: any) => {
          const p = [];
          for (const i in data) {
            if (data.hasOwnProperty(i)) {
              if (data[i].Status == 'Pending') {
                p.push({ ...data[i], id: i })
              }

            }
          }
          return p;
        })
      )
  }

  getInPP() {
    return this.http.get(this.url + '.json')
      .pipe(
        map((data: any) => {
          const p = [];
          for (const i in data) {
            if (data.hasOwnProperty(i)) {
              if (data[i].Status == 'In progress') {
                p.push({ ...data[i], id: i })
              }

            }
          }
          return p;
        })
      )
  }

  getChartData() {
    return this.http.get(this.url + '.json')
      .pipe(
        map((data: any) => {
          const p = [];
          for (const i in data) {
            if (data.hasOwnProperty(i)) {
              const d = new Date(data[i].EndDate)
              p.push(d.getMonth() + 1);
            }
          }
          return p;
        })
      )
  }

  getDoneP() {
    return this.http.get(this.url + '.json')
      .pipe(
        map((data: any) => {
          const p = [];
          for (const i in data) {
            if (data.hasOwnProperty(i)) {
              if (data[i].Status == 'Done') {
                p.push({ ...data[i], id: i })
              }

            }
          }
          return p;
        })
      )
  }

  getProfiles() {
    return this.http.get('https://hello-dd55c-default-rtdb.firebaseio.com/userData.json')
      .pipe(
        map((data: any) => {
          const p: any = [];
          for (const i in data) {
            if (data.hasOwnProperty(i) && data[i].email != 'layavullakula@gmail.com') {
              p.push({
                email: data[i].email,
                url: data[i].Url,
                id: i
              })
            }
          }
          return p;
        })
      )



  }

  postProject(data: any) {
    return this.http.post(this.url + '.json', data)
  }

  putProject(id: any, d: any) {
    const data = {
      'ProjectName': d.project_name,
      'ProjectDescription': d.description,
      'StartDate': d.start_date,
      'EndDate': d.end_date,
      'Status': d.status
    }
    return this.http.patch(this.url + '/' + id + '.json', data)
  }

  deleteProject(id: any) {
    console.log("delete", id)
    return this.http.delete(this.url + '/' + id + ".json")
  }

  getUsers() {
    return this.http.get('https://hello-dd55c-default-rtdb.firebaseio.com/userData.json')
      .pipe(
        map((data: any) => {
          const p = [];
          for (const i in data) {
            if (data.hasOwnProperty(i) && data[i].email != 'layavullakula@gmail.com') {
              p.push({ ...data[i], id: i })
            }
          }
          return p;
        })
      )
  }

  deleteUser(id: any) {
    return this.http.delete(`https://hello-dd55c-default-rtdb.firebaseio.com/userData/${id}.json`)
  }

  updateUser(id: any, data: any) {
    return this.http.patch(`https://hello-dd55c-default-rtdb.firebaseio.com/userData/${id}.json`, data)
  }

  getTools() {
    return this.http.get(this.toolUrl + '.json')
      .pipe(
        map(
          (data: any) => {
            let k = 1;
            const userD: any[] = []
            for (const i in data) {
              if (data.hasOwnProperty(i)) {
                userD.push({ ...data[i], id: i })
              }
            }
            return userD
          }
        )
      )
  }

  postTool(data: any) {
    return this.http.post(this.toolUrl + '.json', data);
  }

  patchTool(id: any, data: any) {
    return this.http.patch(this.toolUrl + '/' + id + '.json', data);
  }

  deleteTool(id: any) {
    return this.http.delete(this.toolUrl + '/' + id + '.json')
  }

  getPrivileges() {
    return this.http.get(this.url + '.json')
      .pipe(
        map(
          (data: any) => {
            const userD = []
            for (const i in data) {
              if (data.hasOwnProperty(i)) {
                if (data[i].Tools) {
                  // console.log("Tools", Object.keys(data[i].Tools));
                  userD.push({
                    pName: data[i].ProjectName,
                    pTools: data[i].Tools, id: i,
                    pTeam: data[i].teamMem,
                  })
                } else {
                  userD.push({
                    pName: data[i].ProjectName,
                    pTools: [], id: i,
                    pTeam: data[i].teamMem,
                  })
                }
              }
            }
            return userD
          }
        )
      )
  }

  postPrivilegesU(projectId: string, add: any) {
    const data = {
      teamMem: [...add],
    }
    return this.http.patch(this.url + "/" + projectId + ".json", data)

  }

  postPrivilegesT(projectId: string, add: any) {
    const data = {
      Tools: [...add],
    }
    return this.http.patch(this.url + "/" + projectId + ".json", data)

  }

  getParticularUserProject() {
    let useremail = localStorage.getItem('email');
    return this.http.get(this.url + '.json')
      .pipe(
        map(
          (data: any) => {
            let k = 1;
            const userD: any[] = []
            for (const i in data) {
              for (const j in data[i].teamMem) {
                if (data[i].teamMem[j] === useremail) {
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
}
