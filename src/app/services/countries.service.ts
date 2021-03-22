import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty, pipe } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { Country } from '../models/country.model';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }
  //filter and map !!
  //cannot return <any> - Not good pratice! <Country[]>.


  public getCountries(): Observable<Country[]> {
     let countries = this.http.get<Country[]>("assets/data.json");
     return this.http.get<Country[]>("assets/data.json").pipe(map(res => res["countries"]));
   //.pipe(map(countries => countries.filter(t => t.id!=0)));
   //filter(c => c.includes("")));    
   //Object.values(countries,state).filter(p=> p.name === "United States"));
   //map(res => res.json()));
   //map((countries => countries.filter(p=> p.id!= null))));
   //.map(res => res.json());
   //return empty();
  }


  public getStates(countryId: number): Observable<State[]> {
    console.log("Country Id from SERVICES", countryId);
   //Does not work when use === https://www.w3schools.com/js/js_comparisons.asp
    return this.http.get<State[]>("assets/data.json").pipe(map(res => res["states"].filter(res => res.countryId == countryId)));
    
   }
}
