import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApiService } from 'src/app/services/http-api.service';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/classes/users';
import { reject } from 'q';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  endPoint: String = environment.registerEndPoint;
  email: String;
  firstname: String;
  lastname: String;
  password: String;
  confirm_passowrd: String;

  constructor(private router: Router, private httpService: HttpApiService ) { }

  ngOnInit() {
  }

  setRegister() {

    const body = {
        email: this.email,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
    };

    console.log(body);

    this.httpService.addUser(body, this.endPoint)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/login']);
      }, (err) => {
        reject(err);
      }
    );

  }

  goLogin() {
    event.preventDefault();
    console.log('go to login');
    this.router.navigate(['/login']);
  }

}
