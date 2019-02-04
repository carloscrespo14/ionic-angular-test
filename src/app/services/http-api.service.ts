import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


const API_URL = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class HttpApiService {
  constructor( private httpclient: HttpClient, private storage: Storage) { }

  getAccounts(endPoint): Observable<any> {
    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('X-access-token')
    });
   return this.httpclient.get(API_URL + endPoint, {headers: reqheaders});
  }

  addAccounts(body, endPoint) {
    const reqheaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('X-access-token')
    });
    return this.httpclient.post(API_URL + endPoint, body, {headers: reqheaders});
  }

  getCatalog(endPoint): Observable<any> {
    return this.httpclient.get(API_URL + endPoint);
  }

  addUser(body, endPoint) {
    return this.httpclient.post(API_URL + endPoint, body);
  }

  loginUser(body, endPoint) {
    return this.httpclient.post(API_URL + endPoint, body);
  }

  getToken() {
    return this.storage.get('X-access-token');
  }

}
