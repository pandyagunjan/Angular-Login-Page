import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';

import { SignupData } from '../models/signup-data.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private signupDataSubject = new BehaviorSubject<SignupData>(null);
  private signupData: Observable<SignupData> = this.signupDataSubject.asObservable();

  constructor() { }

  public saveData(data: any): Observable<SignupData> {
    console.log("From signup Services" , data);;
    return new Observable((observer) => {
      const { username, email, phoneNumber, country, state ,password,confirmPassword } = data || {} as any;
     this.signupDataSubject.next({ username, email, phoneNumber, country, state ,password,confirmPassword});
      observer.complete();
    });

    //
  }

  public getData() {
    console.log(this.signupData);
    
    return this.signupData;
  }
}
