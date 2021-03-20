import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupDetailsComponent } from './components/signup-details/signup-details.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

const routes: Routes = [
     {path: '', component: SignupFormComponent},
     {path: 'myaccount', component: SignupDetailsComponent}
      ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }