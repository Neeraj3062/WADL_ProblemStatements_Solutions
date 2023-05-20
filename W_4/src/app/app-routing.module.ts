import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {redirectTo:'', path:'login', pathMatch:'full'},
  {path:'login' ,component:LoginComponent},
  {path:'signup' ,component:SignupComponent},
  {path:'dashbaord',component:DashboardComponent},
  {path:'profile', component:ProfileComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
