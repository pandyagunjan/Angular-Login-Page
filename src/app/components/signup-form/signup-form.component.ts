import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm , FormGroup ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';
import { SignupService } from '../../services/signup.service';
import { SignupData } from '../../models/signup-data.model';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';
import { subscribeOn, tap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { ConfirmedValidator } from '../../confirmed.validator';
    

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})


export class SignupFormComponent implements OnInit ,OnDestroy {

  countries : Country[];
  filteredStates : State[];
  allStates : State[];
//Subscription objects created so that the unsusbcribe on onDestroy is done
 subscriptionCountry : Subscription
 subscriptionStates : Subscription[] = [] //Throws error
 subscriptionSignUp : Subscription


  user: SignupData = {
    username: '',
    email: '',
    country: '',
    state: '',
    phoneNumber: '955-555-4584',
    password : "",
    confirmPassword: ""
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

    countries$=this.countriesService.countries$;

  ngOnInit():void {

    // On Load, get all countries and set the valdiators on profileForm.
    this.getAllCountries();

    this.profileForm = this.fb.group({
      username: [, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]], // min 8 chars, at least 1 uppercase,
      //phoneNumber: ['', [Validators.required, Validators.pattern('^\+\d(-\d{3}){2}-\d{4}$')]]// 10 numbers
      country: [, Validators.required],
      state: [, Validators.required],
    //   confirmPassword :['', [Validators.required]]
    // }, { 
    //   validator: ConfirmedValidator('password', 'confirm_password')
    // })
    });
  }

 //Set the user object with data recived in the profileForm
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
     this.subscriptionCountry=this.countriesService.getCountries().subscribe(
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
// Get the state based on country selected
//Currently , the id is passed but no list sent back from service
  getStateBasedOnCountry(countryId:number)
  {  
    //Array the subscription ..as the subscription does not get override..

        console.log("The Id received from Country selection:" ,countryId);
        if(countryId)
        {
          this.subscriptionStates.push(this.countriesService.getStates(countryId).subscribe(
        data => {
         this.filteredStates = data;
         console.log("Filtered State" , this.filteredStates);
           },
         error => {
           console.log(error);
           }         

      ));
          }
          else{
            console.log("ELSE PART as no CountryId")
            this.filteredStates=null;
          }
  }


  //submit(form: NgForm) {
    onSubmit(){
      this.setUser();
      console.log("Users data is set in Object");
      this.router.navigate(['myaccount']);
      //No Stringfy needed - Just pass the object , stringfy used to COMPARE (for example)
      this.subscriptionSignUp=this.signupService.saveData(this.user).subscribe(
        response => {
         console.log(response);
         console.log('Registration successful');
         this.navigateToDetails();
        
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

  get email(){
    return this.profileForm.get('email');
  }

  get password(){
    return this.profileForm.get('password');
  }

  get confirmPassword(){
    return this.profileForm.get('confirmPassword');
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

  // To unsubscribe to the subscribed call to avoid memory leak
  ngOnDestroy()
  {
    this.subscriptionCountry.unsubscribe();
    this.subscriptionStates.forEach((sub) => sub.unsubscribe())
    this.subscriptionSignUp.unsubscribe();
  }

  // Plugin Prettier and VSCode ..
}
