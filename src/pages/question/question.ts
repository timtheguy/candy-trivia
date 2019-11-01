import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuestionProvider } from '../../providers/question-provider/question-provider';

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {

  currentQuestion: any = {};
  answers: Array<any> = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public questionProvider: QuestionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionPage');
    console.log("Loading question...");

    this.loadQuestion().subscribe(
      data => {
        console.log(data);
        this.currentQuestion = data;
        this.currentQuestion.question = decodeURIComponent(this.currentQuestion.question);
        this.answers = this.parseAnswers(this.currentQuestion);
        console.log(this.answers);

        console.log("Done!");
      },
      error => {
        console.log("Error: " + error);
      });
  }

  loadQuestion() {
    return this.questionProvider.getRandomQuestion()
  }

  checkAnswer(answer) {
    var result = { correct: false, answer: this.currentQuestion.correct_answer};

    if(answer == this.currentQuestion.correct_answer){
      result.correct = true;
    }

    this.navCtrl.setRoot('ResultPage', result, {animate: true, direction: 'back'});
  }

  parseAnswers(question: any){
    var tempAnswers = [question.correct_answer];
    tempAnswers.push(...question.incorrect_answers);

    tempAnswers = tempAnswers.map(function(element) {
      return element = (element);
    });

    return this.shuffleArray(tempAnswers);
  }

  decodeEntities(text) {
    var entities = [
        ['amp', '&'],
        ['apos', '\''],
        ['#x27', '\''],
        ['#x2F', '/'],
        ['#39', '\''],
        ['#47', '/'],
        ['lt', '<'],
        ['gt', '>'],
        ['nbsp', ' '],
        ['quot', '"'],
        ['#039', '"']
    ];

    for (var i = 0, max = entities.length; i < max; ++i) 
        text = text.replace(new RegExp('&'+entities[i][0]+';', 'g'), entities[i][1]);

    console.log(text);
    return text;
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    return array;
  }
}
