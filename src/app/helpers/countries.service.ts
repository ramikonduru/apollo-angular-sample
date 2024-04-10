import { from, Observable, Subscription  } from "rxjs";
import gql from "graphql-tag";
import { CountryClass, IWebResponse } from "../types";
import { GraphqlHelperService } from "./graphql-helper.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })

@Injectable()
export class CountriesService extends GraphqlHelperService{
    
    // Method to get the countries info
    public GetCountries<T>() : Observable<T>{

        const Get_Countries = gql`
        query GetCountries {
            countries{
                name,
                code,
                currency
            }
        }
        `;

        return this.GetData<T>(Get_Countries, undefined);
    }

    // Get the specific country by its code
    public GetCountry<T>() : Observable<T>{

        // Creating query
        const Get_Country = gql`
        query GetCountry($code:ID!) {
            country(code:$code) {
                name,
                currency
            }
        }
        `;
        // TODO: Hard coded the variables, Needs to be generic
         return this.GetData<T>(Get_Country, [{name:"code", value:"IN"}]);;
    }

}

