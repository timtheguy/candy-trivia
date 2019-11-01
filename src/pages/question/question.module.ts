import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionPage } from './question';
import { Sanitize } from '../../app/sanitize.pipe';

@NgModule({
  declarations: [
    QuestionPage,
    Sanitize
  ],
  imports: [
    IonicPageModule.forChild(QuestionPage)
  ],
})
export class QuestionPageModule {}
