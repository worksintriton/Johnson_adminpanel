import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  email_id: any;
  passwords: any;
  phone_number: any;
  data: any;
  selectedAudio1: any;
  Pic: any;



  loginDetails: any;
  userData: any;
  validation = false;

  loginError = false;
  loginErrorMsg: any;

  email: any;
  emailError = false;
  emailErrorMsg: any;


  password: any;
  passwordError = false;
  passwordErrorMsg: any;
  constructor(
    private router: Router,
    private toastr: ToastrManager,
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: StorageService
  ) {}

  ngOnInit(): void {
  }

  emailValidator() {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailcheck = reg.test(this.email);
    if (this.email === '' || this.email === undefined || this.email === null) {
      this.emailError = true;
      this.emailErrorMsg = 'Email Address Required.'
    } else if (!emailcheck) {
      this.emailError = true;
      this.emailErrorMsg = 'Enter Valid Email Address.'
    } else {
      this.emailError = false;
    }
  }
  passwordValidator() {
    if (this.password === '' || this.password === undefined || this.password === null) {
      this.passwordError = true;
      this.passwordErrorMsg = 'Password Required.'
    } else {
      this.passwordError = false;
    }
  }

  emailChange(data:any) {
    //console.log(data);
    this.email = data;
    this.emailValidator();
  }

  passwordChange(data:any) {
    //console.log(data);
    this.password = data;
    this.passwordValidator();
  }

  validator() {
    this.emailValidator();
    this.passwordValidator();
    if (!this.emailError && !this.passwordError) {
      this.validation = true;
    } else {
      this.validation = false;
    }
  }

  logintest1() {
    this.validator();
    if (this.validation) {
      if ((this.email == 'johnson@gmail.com') && (this.password == '12345')) {
       this.saveInLocal('login', true);
        this.router.navigateByUrl('/admin/dashboard');
      } else {
        this.toastr.errorToastr("Invalid Account");
      }
    }
  }

  saveInLocal(key:any, val:any): void {
    this.storage.set(key, val);
  }

  getFromLocal(key:any){
    return this.storage.get(key);
  }

}
