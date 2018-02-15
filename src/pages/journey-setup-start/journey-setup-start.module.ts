import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JourneySetupStartPage } from './journey-setup-start';

@NgModule({
  declarations: [
    JourneySetupStartPage,
  ],
  imports: [
    IonicPageModule.forChild(JourneySetupStartPage),
  ],
})
export class JourneySetupStartPageModule {}
