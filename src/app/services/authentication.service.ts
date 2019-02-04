import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';


const TOKEN_KEY = 'MI_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticationState = new BehaviorSubject(false);
  constructor(private storage: Storage, private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  login(token) {
    return this.storage.set('X-access-token', token.token).then(res => {
      localStorage.setItem('X-access-token', token.token);
      this.decodeToken(res);
      this.authenticationState.next(true);
    });
  }

  logout() {
    return this.storage.remove('X-access-token').then(() => {
      localStorage.removeItem('X-access-token');
      this.authenticationState.next(false);
    });
  }

  isAuthtenticated() {
    return this.authenticationState.value;
  }

  checkToken() {
    return this.storage.get('X-access-token').then((res) => {
      if (res) {
        this.decodeToken(res);
        this.authenticationState.next(true);

      }
    });
  }

  decodeToken(token) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    console.log(decodedToken);
    localStorage.setItem('userId', decodedToken.id);
    localStorage.setItem('firstname', decodedToken.firstname);
    localStorage.setItem('lastname', decodedToken.lastname);
    return decodedToken;
  }
}
