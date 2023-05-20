import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: FormGroup | any;
  constructor(private _route: Router, private _http: HttpClient, private userService :UserService) {}
  ngOnInit(): void {

    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!)
      this.userService.setCurrentUser(user);
      this._route.navigate(['dashboard'])
    }
    this.login = new FormGroup({
      fname: new FormControl(),
      password: new FormControl(),
    });
    const currentUser = this.userService.getCurrentUser();
    if(currentUser){
        this._route.navigate(['dasboard'])
    }
  }

  logindata(login: FormGroup) {
    // console.log(this.login.value);
    this._http.get<any>('http://localhost:3000/users').subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.fname === this.login.value.fname &&
            a.password === this.login.value.password
          );
        });
        if (user) {
          this.userService.setCurrentUser(user)
          alert('Login Success');
          this._route.navigate(['dashboard']);
          this.login.reset();
          $('.form-box').css('display', 'none');
          $('.form-box1').css('display', 'none');
        } else {
          alert('User not Found');
          this._route.navigate(['login']);
        }
      },
      (err) => {
        alert('Wrong Credentials');
      }
    );
  }

  flip1() {
    this._route.navigate(['signup']);
    $('.form-box').css('display', 'none');
    $('.form-box1').css('display', 'block');
  }
}
