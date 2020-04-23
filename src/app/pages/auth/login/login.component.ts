import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ILogin } from './login.model';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoading = false;
  error: string = null;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authservice.login(form.value);
    /* .subscribe(
      res => {
        // this is the response data if succed
        console.log('response : ', res);

        this.isLoading = false;
        this.router.navigate(['/hero'])
      },
      errorMessage => {
        console.log('error from err : ', errorMessage);
        this.error = 'Email not found from err';
        this.isLoading = false;
      }
    ); */
    form.reset();
  }
}
