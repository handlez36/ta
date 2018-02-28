import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateJourneyCategoryPage } from './create-journey-category';

@NgModule({
  declarations: [
    CreateJourneyCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateJourneyCategoryPage),
  ],
})
export class CreateJourneyCategoryPageModule {}
