import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditJourneyPage } from './edit-journey';

@NgModule({
  declarations: [
    EditJourneyPage,
  ],
  imports: [
    IonicPageModule.forChild(EditJourneyPage),
  ],
})
export class EditJourneyPageModule {}
