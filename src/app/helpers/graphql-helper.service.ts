
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { DocumentNode} from "graphql";
import { from, Observable  } from "rxjs";
import { map } from 'rxjs/operators';
import { isUndefined } from "util";
import { VariableBase } from "../types";

@Injectable({
    // declares that this service should be created
    // by the root application injector.
    // Test comment for commit history
    providedIn: 'root',
  })

@Injectable()
export abstract class GraphqlHelperService{

    constructor(private apollo: Apollo) {}
    
    // public async GetData<T>(gqlQuery: DocumentNode): Promise<T[]>
    // {   
    //     const result = await this.apollo.query({ query:gqlQuery }).toPromise();
    //     return result.data as T[];  
    // }

    // public GetData1<T>(gqlQuery: DocumentNode): Observable<T>
    // {   
    //     const result =  this.apollo.query({ query:gqlQuery });
    //     return  from(this.apollo.query({ query:gqlQuery })).pipe(map(response => <T>response.data));
    // }

    // public GetCountry<T>(gqlQuery: DocumentNode, codeValue: string): Observable<T>
    // {   const variables = {code: codeValue};
    //     return  from(this.apollo.query({ query:gqlQuery,variables })).pipe(map(response => <T>response.data));
    // }

    // // Method to get data based on query and the parameters given
    // public GetDataParams<T>(gqlQuery: DocumentNode, params: VariableBase[]): Observable<T>
    // {  let variables = this.GenerateVariables(params);
    //     return  from(this.apollo.query({ query:gqlQuery,variables })).pipe(map(response => <T>response.data));
    // }

    // Method to get data based on query and the parameters given
    public GetData<T>(gqlQuery: DocumentNode, params: VariableBase[]): Observable<T>
    { 
        let variables ={};
        if (!isUndefined(params) && params.length > 0) {
             variables = this.GenerateVariables(params);
        }
        return  from(this.apollo.query({ query:gqlQuery,variables })).pipe(map(response => <T>response.data));
    }

    // Helper method to generate variables
    private GenerateVariables(params: VariableBase[]): any {

        let variables = Object.assign({}, ...params.map((x) => ({[x.name]: x.value})));
        return variables;
    }
}