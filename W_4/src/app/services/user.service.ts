import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUser :any
  constructor() { 
    const storedUser = localStorage.getItem('currentUser');
    if(storedUser){
      this.currentUser = JSON.parse(storedUser)
    }
  }


  setCurrentUser(user:any){
    this.currentUser = user;
    localStorage.setItem('currentUser',JSON.stringify(user));
  }
  getCurrentUser(){
    return this.currentUser
  }
  logout(){
    this.currentUser=null;
    localStorage.removeItem('currentUser')
  }
}

