import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import {AuthService } from '../auth.service';
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmmited= false;
  constructor(
    private router: Router,
     private formbuilder: FormBuilder,
     private authService: AuthService
     ) {}

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      name: ["", Validators.required],

      dob: ["", Validators.required],

      email: ["", Validators.required],

      password: ["", Validators.required],
    });
  }
  

  registerUser(){
    // detect button clicked
    this.isSubmmited = true;
    if(this.isSubmmited && this.registerForm.invalid){
      return;
    } else{
      this.authService.setRegisteredData(this.registerForm.value)
      this.router.navigateByUrl('/login')
    }
  }
}
