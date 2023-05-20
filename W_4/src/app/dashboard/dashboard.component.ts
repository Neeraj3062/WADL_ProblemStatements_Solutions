import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user:any
  constructor(private userService :UserService, private _route:Router){}
  ngOnInit(): void{
    this.user = this.userService.getCurrentUser();
  }

  logout(){
    this.userService.setCurrentUser(null);
    this._route.navigate(['login'])
  }


}
