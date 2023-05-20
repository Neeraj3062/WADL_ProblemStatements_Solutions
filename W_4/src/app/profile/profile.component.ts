import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user :any
  constructor(private userService :UserService){}
  ngOnInit():void{
    this.user = this.userService.getCurrentUser();
  }
  goBack() {
    window.history.back();
  }

}
