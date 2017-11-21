import { AddCategoryPage } from '../pages/categories/add-category/add-category';
import { FeaturedJourneyComponent } from '../components/featured-journey/featured-journey';
import { IonicStorageModule } from '@ionic/storage';
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
import { MocSqliteDataServiceProvider } from '../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { JourneyDataServiceProvider } from '../providers/journey-data-service/journey-data-service';

import { MockJourniesProvider } from '../providers/static-data/mock-journies/mock-journies';
import { MockCategoriesProvider } from '../providers/static-data/mock-categories/mock-categories';
import { MockDataServiceProvider } from '../providers/static-data/mock-data-service/mock-data-service';
import { CategoryDataServiceProvider } from '../providers/category-data-service/category-data-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoriesPage,
    JourneySliderComponent,
    FeaturedJourneyComponent,
    FooterMenuComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
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
    MockDataServiceProvider,
    MocSqliteDataServiceProvider,
    JourneyDataServiceProvider,
    CategoryDataServiceProvider
  ]
})
export class AppModule {}
