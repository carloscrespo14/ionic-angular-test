import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { HttpApiService } from 'src/app/services/http-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  endPoint: String = environment.accountsEndPoint;
  endPointCatalog: String = environment.catalogsEndPoit;
  type_cards: Array<any> = [];
  body: Object = {};
  constructor(private authServ: AuthenticationService, private router: Router, private httpservice: HttpApiService) { }
  username: String;
  ngOnInit() {
    this.getAccounts();
    this.getCatalog();
    this.username = localStorage.getItem('firstname') + ' ' + localStorage.getItem('lastname');
  }

  doLogout(event) {
    event.preventDefault();
    this.router.navigate(['/login']);
    this.authServ.logout();
  }

  getCatalog() {
    this.httpservice.getCatalog(this.endPointCatalog)
    .subscribe(
      data => {
        console.log(data.response.type_cards);
        this.type_cards = data.response.type_cards;
      }
    );
  }

  getAccounts() {
    this.httpservice.getAccounts(this.endPoint)
    .subscribe(
      data => {
        console.log(data);
      }
    );
  }

  setRequestCards() {
    console.log(this.body);
    this.httpservice.addAccounts(this.body, this.endPoint)
    .subscribe (
      data => {
        console.log(data);
      }
    );
  }

  selectHandler(event) {
    if (event.detail.value = 'TDD') {
      this.body = {
        userId: localStorage.getItem('userId'),
        type: event.detail.value,
        name: 'Tarjeta Plata'
      };
    }

    if (event.detail.value = 'TDC') {
      this.body = {
        userId: localStorage.getItem('userId'),
        type: event.detail.value,
        name: 'Tarjeta Oro'
      };
    }
  }


}