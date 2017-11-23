import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddJourneyPage } from './add-journey';

@NgModule({
  declarations: [
    AddJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(AddJourneyPage),
  ],
})
export class AddJourneyPageModule {}
