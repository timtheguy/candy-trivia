import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CandyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CandyProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CandyProvider Provider');
  }

  dispenseCandy(){
    return this.http.get('http://192.168.4.1/MEDIUM?')
    .map(res => {
      return res;
    });
  }

}
