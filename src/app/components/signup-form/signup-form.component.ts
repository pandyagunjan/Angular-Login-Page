import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm , FormGroup ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { SignupService } from '../../services/signup.service';
import { SignupData } from '../../models/signup-data.model';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})


export class SignupFormComponent implements OnInit {

  countries : Country[];
  filteredStates : State[];
  allStates : State[];
  user: SignupData //={};
  //submitUser : SignupData = {};
  profileForm: FormGroup;

  
  @Output()
  save = new EventEmitter<SignupData>();

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
    private signupService: SignupService, 
    private router: Router) {  }

  //submit(form: NgForm) {
    onSubmit(){
   //this.setUser();
    console.log("Users data is set in Object");
    this.router.navigate(['myaccount']);

  }

  ngOnInit():void {
    this.getAllCountries();
    this.profileForm = this.fb.group({
      username: [, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]], // min 8 chars, at least 1 uppercase,
      //phoneNumber: ['', [Validators.required, Validators.pattern('^\+\d(-\d{3}){2}-\d{4}$')]]// 10 numbers
    });
  }

  get email(){
    return this.profileForm.get('email');
  }

  get password(){
    return this.profileForm.get('password');
  }

  get username()
  {
    return this.profileForm.get('username');
  }

  get phoneNumber()
  {
    return this.profileForm.get('phoneNumber');
  }

  get country()
  {
    return this.profileForm.get("country");
  }

  setUser()
  {
    // this.user.email=this.profileForm.get('email').value;
    // this.user.password=this.profileForm.get("password").value;
    // this.user.phoneNumber=this.profileForm.get("phoneNumber").value;
    this.user.username=this.profileForm.get("username").value;
  }

  getAllCountries()
  {
    this.countriesService.getCountries().subscribe(
      data => {
     
     this.countries=data["countries"];
     this.allStates=data["states"];
     console.log("JSON Countries: ",this.countries)
     console.log("JSON States: ",this.allStates)
     this.getStateBasedOnCountry(1);
      },
    error => {
      console.log(error);
      }

    );
  }

  getStateBasedOnCountry(id:number)
  {  
      this.filteredStates=this.allStates.filter((state) => (state.countryId === id));
      console.log("Filtered Array" , this.filteredStates);
  }
}
