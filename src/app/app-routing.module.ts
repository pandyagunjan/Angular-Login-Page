import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupDetailsComponent } from './components/signup-details/signup-details.component';

const routes: Routes = [
     {path: 'myaccount', component: SignupDetailsComponent}
      ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }