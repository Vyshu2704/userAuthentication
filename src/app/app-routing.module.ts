import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './login/otp/otp.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:LoginComponent},
  {path:'otp-path',component:OtpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
