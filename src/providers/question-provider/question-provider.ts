import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionProvider {

  constructor(public http: HttpClient) {
    console.log('[QUESTIONS] Question provider loaded');
  }

  getQuestions() {
    return this.http.get('assets/data/questions.json').map(res => {
      return res;
    });
  }

  getRandomQuestion() {
    return Observable.create(observer => {
      this.getQuestions().subscribe(
        data => {
          let question = this.getRandomElement(data['results']);
          observer.next(question);
          observer.complete();
        },
        error => {
          observer.error();
          console.log("Error: " + error);
        });
    });
  }

  getRandomElement(array) {
    var randomElement = (Math.random() * (array.length - 0 + 1) ) << 0;
    console.log("[QUESTION] Getting random question #" + randomElement + " from array size " + array.length);
    return array[randomElement];
  }

}
