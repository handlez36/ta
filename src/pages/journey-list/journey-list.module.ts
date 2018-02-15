import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneyListPage } from './journey-list';
import { JourneyDetailPage } from '../journey-detail/journey-detail';

@NgModule({
  declarations: [
    // JourneyListPage,
    // JourneyDetailPage
  ],
  imports: [
    IonicPageModule.forChild(JourneyListPage),
  ],
})
export class JourneyListPageModule {}
