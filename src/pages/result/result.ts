import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CandyProvider } from '../../providers/candy-provider/candy-provider';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser'

/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  correctResult: boolean;
  answer: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public candyProvider: CandyProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private sanitizer: DomSanitizer) {

    this.correctResult = this.navParams.get('correct');

    if(this.correctResult == undefined){
      this.navCtrl.setRoot(HomePage)
    }else{
      console.log("[RESULT] User answer correct: " + this.correctResult);
      this.answer = this.sanitizer.bypassSecurityTrustHtml(this.navParams.get('answer'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
  }

  dispenseCandy(){
    let loading = this.loadingCtrl.create({
      content: 'Dispensing candy...',
      enableBackdropDismiss: true
    });
  
    loading.present();

    this.candyProvider.dispenseCandy()
    .subscribe(
      (response) => {
        console.log("[RESULT] Response: ");
        console.log(response);
        
        loading.dismiss();
        this.goHome();
      },
      (error) => {
        console.log("[RESULT] Error: ");
        console.log(error);

        if(error.status == 0){
          // const alert = this.alertCtrl.create({
          //   title: 'Request timed out',
          //   subTitle: 'Is the Candy Dispenser connected?',
          //   buttons: ['OK']
          // });
          // alert.present();
        }

        loading.dismiss();
        this.goHome();
    });
  }

  tryAgain() {
    this.navCtrl.setRoot('QuestionPage', {}, {animate: true, direction: 'back'});
  }

  goHome() {
    this.navCtrl.insert(0,HomePage);
    this.navCtrl.popToRoot();
  }

}
