import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap } from 'rxjs';
import { LinkService } from './link.service';

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url = 'https://hello-dd55c-default-rtdb.firebaseio.com/userData'



  constructor(private http: HttpClient,
    private link: LinkService,) {

  }


  postUserData(data: any) {
    return this.http.post(this.url + '.json', data)
  }

  getUserData = async () => {
    const s = await this.getid();
    return this.http.get(this.url + '/' + s + '.json')
  }

  updateUserData = async (data: any) => {
    console.log("update data", data);
    const s = await this.getid();
    console.log("id", s);

    return this.http.post(this.url + '/' + s + '.json', data)
  }

  updateUseData = async (data: any) => {
    console.log("update data", data);
    const s = await this.getid();
    console.log("id", s);

    return this.http.put(this.url + '/' + s + '.json', data)
  }

  uploadImgUrl = async (data: any) => {
    console.log("update data", data);
    const s = await this.getid();
    console.log("id", s);

    return this.http.put(this.url + '/' + s + '.json', data)
  }

  getUid() {
    console.log("get Uid");
    const uid = localStorage.getItem('user')
    return uid;
  }

  async getLink(s: any): Promise<any> {
    return (await this.link.getLink()).toPromise().then((data: any) => {
      for (let i of data) {
        if (s === i.uid) {
          return i
        }
      }
    })
  }

  async getid() {
    const s: any = await this.getUid();
    const r = await this.getLink(s);
    return r.id;
  }

  uploadImg(file: File) {
    const storage = getStorage();
    const name: any = localStorage.getItem('user')
    const fileRef = ref(storage, name);
    const uploadTask = from(uploadBytes(fileRef, file));
    return uploadTask.pipe(
      switchMap((result) => getDownloadURL(result.ref))
    )
  }



}
