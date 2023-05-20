import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private _route: Router, private _http: HttpClient) { }
  signup: FormGroup | any;

  ngOnInit(): void {
    this.signup = new FormGroup({
      'fname': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl()
    })
  }
  signupdata(signup: FormGroup) {
    // console.log(this.signup.value);  
    this._http.post<any>("http://localhost:3000/users",this.signup.value)
    .subscribe(res=>{
      this._route.navigate(['login'])
      this.flip2();
      this.signup.reset();

    } ,err=>{
      alert("Wrong Credentials")
    })

  }


  flip2() {
    this._route.navigate(['login']);
    $('.form-box').css('display', 'block');
    $('.form-box1').css('display', 'none');

  }  

}
