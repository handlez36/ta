import { FooterMenuComponent } from '../components/footer-menu/footer-menu';
import { CategoriesPage } from './../pages/categories/categories';
import { JourneySliderComponent } from './../components/journey-slider/journey-slider';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { MockJourniesProvider } from '../providers/mock-journies/mock-journies';
import { MockCategoriesProvider } from '../providers/mock-categories/mock-categories';
import { MockDataServiceProvider } from '../providers/mock-data-service/mock-data-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriesPage,
    JourneySliderComponent,
    FooterMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoriesPage,
    JourneySliderComponent,
    FooterMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider,
    MockJourniesProvider,
    MockCategoriesProvider,
    MockDataServiceProvider
  ]
})
export class AppModule {}
