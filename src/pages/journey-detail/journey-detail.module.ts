import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyDetailPage } from './journey-detail';

@NgModule({
  declarations: [
    JourneyDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneyDetailPage),
  ],
})
export class JourneyDetailPageModule {}
