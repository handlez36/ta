import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BaseCategoryPage } from './base-category';

@NgModule({
  declarations: [
    BaseCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(BaseCategoryPage),
  ],
})
export class BaseCategoryPageModule {}
