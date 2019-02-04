import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpApiService } from 'src/app/services/http-api.service';
import { environment } from 'src/environments/environment';
import { reject } from 'q';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  endPoint: String = environment.loginEndPoint;
  user: String;
  pass: String;

  constructor(private router: Router, private httpservice: HttpApiService, private authenticationservice: AuthenticationService) { }

  ngOnInit() {
  }

  setLogin() {
    const body = {email: this.user, password: this.pass};
    this.httpservice.loginUser(body, this.endPoint)
    .subscribe(
      res => {
        console.log(res);
        this.authenticationservice.login(res);

      }, (err) => {
        reject(err);
      }
    );
  }

  goRegistration(event) {
    event.preventDefault();
    this.router.navigate(['/register']);

  }
}
