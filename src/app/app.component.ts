import { Component } from '@angular/core';
import { Apollo } from "apollo-angular";
import gql from 'graphql-tag';
import { Observable, of } from "rxjs";
import {  CountryClass, IWebResponse } from './types';
import{GraphqlHelperService} from '../app/helpers/graphql-helper.service';
import { CountriesService } from './helpers/countries.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apollo-angular-sample';

  countries: any;

  // Injecting apollo and Countries service
  constructor(private apollo: Apollo, private graphQLService: CountriesService) {}

  ngOnInit(){

    // Getting the country info by its code
    const obsParams = this.graphQLService.GetCountry<IWebResponse<CountryClass>>();
    // Call back
    const promiseThenParams = (response: IWebResponse<CountryClass>) => {
      console.log("Got the countries info and below the countries");    
      console.log(response);
    };
    this.runPromise(obsParams,promiseThenParams);

       // Getting countroes info and logging in the console
    const obsParams1 = this.graphQLService.GetCountries<IWebResponse<CountryClass[]>>();
    // Call back
    const promiseThenParams1 = (response: IWebResponse<CountryClass[]>) => {
      console.log("Got the country for the provided country code");
      console.log(response);

      // Binding data
      this.countries = response.countries;
    };
    this.runPromise(obsParams1,promiseThenParams1);

  }

  // Helper method to handle the callbacks
  public async runPromise<K>(observable: Observable<K>, promiseThen)
  {
    try {
      await observable.toPromise().then(async x => {
          await promiseThen(x);
      }).catch(async error => {
        console.log("Error while processing observable");
        console.log(error);
      });
  } catch (error) {
    console.log("Error while running promise");
    console.log(error);
  }
}
}
