import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable,Subject,combineLatest, empty, pipe } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';

import { Country } from '../models/country.model';
import { State } from '../models/state.model';
import { createThis } from 'typescript';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }
  //filter and map !!
  //cannot return <any> - Not good pratice! <Country[]>.

private objPath='assets/data.json';
//Represents Observable.

countries$ = this.http.get<Country[]>(this.objPath).pipe(map(res => res["countries"]));
states$ = this.http.get<State[]>(this.objPath).pipe(map(res => res["states"]));

// statesBasedonCountry$ = combineLatest([this.countries$ ,this.states$]).
// pipe(
//   map(([countries,states]) =>
//   countries.map(
//   c => 
//   ({...c ,
//   state : states.find(s => s.countryId == c.id).name
// } as State))));



private countrySelectionAction = new Subject<number>();

countrySelectionAction$=this.countrySelectionAction.asObservable();

countryWithStates$=combineLatest([this.countrySelectionAction,this.states$]).pipe((map(([selectedCountryId,states]) =>
states.filter(state => state.countryId == selectedCountryId) ) ));
//console.log(countryWithStates$);



  public getCountries(): Observable<Country[]> {
     let countries = this.http.get<Country[]>("assets/data.json");
     return this.http.get<Country[]>(this.objPath).pipe(map(res => res["countries"]));
  }


  // public getStates(countryId: number): Observable<State[]> {
  //   console.log("Country Id from SERVICES", countryId);
  //  //Does not work when use === https://www.w3schools.com/js/js_comparisons.asp
  //   return this.http.get<State[]>(this.objPath).pipe(map(res => res["states"].filter(res => res.countryId == 1)));
  //  }


   public getStates(countryId: number | null): void{
     console.log("Country ID from Service : " , countryId);
    console.log(this.countrySelectionAction.next(countryId));
    console.log(this.countryWithStates$);
   }
}
