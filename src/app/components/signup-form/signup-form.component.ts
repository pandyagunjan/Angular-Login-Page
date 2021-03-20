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
 // user: SignupData 

  user: SignupData = {
    username: '',
    email: '',
    country: '',
    state: 'Arkansas',
    phoneNumber: '955-555-4584',
    password : "",
    confirmPassword: "Gunjan@123"
  };

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
    this.setUser();
    console.log("Users data is set in Object");
    //this.router.navigate(['/myaccount']);
    this.signupService.saveData(JSON.stringify(this.user)).subscribe(
      response => {
       console.log(response);
       console.log('Registration successful');
      
       },
       error => 
       {
        console.log('Registration NOT successful');
       }
     );


  }
  navigateToDetails()
  {
    this.router.navigate(['myaccount']);
  }

  ngOnInit():void {
    this.getAllCountries();

    this.profileForm = this.fb.group({
      username: [, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]], // min 8 chars, at least 1 uppercase,
      //phoneNumber: ['', [Validators.required, Validators.pattern('^\+\d(-\d{3}){2}-\d{4}$')]]// 10 numbers
      country: [, Validators.required],
      state: [, Validators.required],
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
  get state()
  {
    return this.profileForm.get("state");
  }

  setUser()
  {
    this.user.username=this.profileForm.get("username").value;
    this.user.email=this.profileForm.get('email').value;
    this.user.password=this.profileForm.get("password").value;
   // this.user.phoneNumber=this.profileForm.get("phoneNumber").value;
    this.user.country=this.profileForm.get("country").value;
    this.user.state=this.profileForm.get("state").value;
    console.log(this.user);

  }

  getAllCountries()
  {
    //2 types observable hot and cold observable - (Memory leak) Best Preatice - Subscribe and unsubscirbe 
     const sub=this.countriesService.getCountries().subscribe(
     data => {
     this.countries=data;
     console.log("Countries" , this.countries);
    },
    error => {
      console.log(error);
      }

    );

    // lifecycle hooks - Angular components (distroy - you can unsubscribe here) 
    //Design pattern - 
  }

  getStateBasedOnCountry(countryId:number)
  {  
        console.log("The Id received from Country selection:" ,countryId);
        if(countryId)
        {
        this.countriesService.getStates(countryId).subscribe(
        data => {
      //   console.log(data);
         this.filteredStates = data;
         console.log("Filtered State" , this.filteredStates);
           },
         error => {
           console.log(error);
           }         

      );
          }
          else{
            console.log("ELSE PART as no CountryId")
            this.filteredStates=null;
          }

  }


  ngOnDestroy()
  {
    
  }
}
