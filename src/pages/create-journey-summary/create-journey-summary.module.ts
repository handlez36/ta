import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateJourneySummaryPage } from './create-journey-summary';

@NgModule({
  declarations: [
    CreateJourneySummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateJourneySummaryPage),
  ],
})
export class CreateJourneySummaryPageModule {}
