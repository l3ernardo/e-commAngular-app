import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

console.log('form register : ', form);

this.authservice.postRegister(form.value).subscribe(res => {
      console.log('onSubmit res : ', res);
    });
  }

}
