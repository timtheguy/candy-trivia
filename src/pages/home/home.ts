import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import "rxjs/add/observable/timer";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  interval: any;
  timeLeft: any = 15;
  interfaceEnabled: boolean = false;

  constructor(public navCtrl: NavController) {
    this.startTimer();
  }

  startTimer() {
    console.log("[TIMER] Started questionWait timer")
    this.interval = setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft = this.timeLeft - 1;
      } else {
        console.log("[TIMER] Timer completed");
        this.interfaceEnabled = true;
        clearInterval(this.interval);

      }

      console.log("[TIMER] Seconds remaining: " + this.timeLeft);
    }, 1000)
  }
    
  startGame(){
    this.navCtrl.push('QuestionPage', {}, {animate: true, direction: 'forward'});
  }

}
