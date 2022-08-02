import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { deleteUser, EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  actioncode = 'sails@123'

  email = localStorage.getItem('email');
  admin = localStorage.getItem('user') == 'mN1XpgmzpENjE8DQRSrvBKgR81y2' ? true : false;


  constructor(private fauth: AngularFireAuth,
    private http: HttpClient,
    private router: Router) {

  }

  getAccess() {
    const s = localStorage.getItem('user')
    if (s === null) {
      this.router.navigate(['/login']);
    }
  }

  async register(email: any, password: any) {
    return await this.fauth.createUserWithEmailAndPassword(email, password)
  }

  async realDbRegister(data: any) {
    return await this.http.post('https://hello-dd55c-default-rtdb.firebaseio.com/userData.json', data)
  }

  linkDb(data: any) {
    return this.http.post('https://hello-dd55c-default-rtdb.firebaseio.com/Link.json', data)
  }

  async login(email: any, password: any) {
    // this.email = email;
    return await this.fauth.signInWithEmailAndPassword(email, password)
  }

  async forgot(email: any) {
    return await this.fauth.sendPasswordResetEmail(email)
  }

  async deletUser() {
    const auth = getAuth();
    const user: any = auth.currentUser;
    const email: any = localStorage.getItem('user');

    console.log("user", user);
    if (user.email == email) {
      return await deleteUser(user)
    } else {
      console.log("errornot deleted User")
    }
  }

  async reset(pswd: any, nPswd: any) {
    const auth = getAuth();

    const email: any = localStorage.getItem('email')

    const credentials = EmailAuthProvider.credential(email, pswd);
    const user: any = auth.currentUser;
    const newPassword = nPswd;

    return await this.relogin(user, credentials)
      .then((data) => {
        console.log("reauthenticated", data);
        return updatePassword(user, newPassword)
      }, (error) => {
        console.error(error)
        return new Error(error);
      })

    // return updatePassword(user, newPassword)
  }

  async relogin(user: any, credentials: any) {
    return await reauthenticateWithCredential(user, credentials)
  }

  async logout() {
    localStorage.removeItem('user');
    if (this.isAdmin()) {
      this.admin = false;
    }
    return await this.fauth.signOut();
  }

  isAdmin() {
    const uid = localStorage.getItem('user');
    let s;
    if (uid == 'mN1XpgmzpENjE8DQRSrvBKgR81y2') {
      this.admin = true;
      s = true;
    } else {
      this.admin = false;
      s = false;
    }
    return s;
  }
}
