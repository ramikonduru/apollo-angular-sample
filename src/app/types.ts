// export type Country = {
//     name: string;
//     code: string;
//     currency: string;
// }

export interface VariableBase {
    name: string;
    value: any;
}

export class CountryClass{
    name: string;
    code: string;
    currency: string;
}

export interface IWebResponse<T> {
    data: T;
    headers?: any;
    config: any;
    status: number;
    statusText: string;
  }