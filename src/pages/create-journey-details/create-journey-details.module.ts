import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateJourneyDetailsPage } from './create-journey-details';

@NgModule({
  declarations: [
    CreateJourneyDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateJourneyDetailsPage),
  ],
})
export class CreateJourneyDetailsPageModule {}
