import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "../auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmmited = false;
  allUserData: any;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ["", Validators.required],

      password: ["", Validators.required],
    });
  }

  loginUser() {
    // detect button clicked
    this.isSubmmited = true;
    if (this.isSubmmited && this.loginForm.invalid) {
      return;
    } else {
      this.allUserData = this.authService.getRegisteredAllUsers();
      if(this.allUserData != []){
        this.allUserData.forEach(element => {
          if((element.email === this.loginForm.value.email)  && (element.password === this.loginForm.value.password)){
            console.log('User logged successfull')
            this.router.navigateByUrl('/dashboard')
          }
        });
      }
    }
  }
  gotoRegister(){
    this.router.navigateByUrl('/register');
  }
}
