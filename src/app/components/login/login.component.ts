import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  model: any = {}

  constructor(public authService: AuthService, private builder: FormBuilder) { }

  ngOnInit() {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.builder.group({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
  }

  onLogin(){
    this.authService.SignIn(this.loginForm.get('email').value, this.loginForm.get('password').value);
    console.log(this.loginForm.value);
  }

  login() {
    console.log(this.model)
  }

}
