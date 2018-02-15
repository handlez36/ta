import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyJourneyPage } from './my-journey';

@NgModule({
  declarations: [
    MyJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyJourneyPage),
  ],
})
export class MyJourneyPageModule {}
