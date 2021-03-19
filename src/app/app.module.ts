import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { SignupDetailsComponent } from './components/signup-details/signup-details.component';
import { FieldmatchesDirective } from './validators/fieldmatches.directive';

enum RoutePaths {
  SignupForm = 'signup-form',
  SignupDetails = '',
}

export const appRoutes: Routes = [

];

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    SignupDetailsComponent,
    FieldmatchesDirective,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
