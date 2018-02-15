import { JourneyDetailPageModule } from './../pages/journey-detail/journey-detail.module';
import { HttpModule } from '@angular/http';
import { JourneyListPage } from './../pages/journey-list/journey-list';
import { BaseCategoryPage } from '../pages/base-category/base-category';
import { BaseCategoryPageModule } from './../pages/base-category/base-category.module';
import { AddCategoryPage } from '../pages/categories/add-category/add-category';
import { JourneyDetailPage } from './../pages/journey-detail/journey-detail';
import { MyJourneyPage } from './../pages/my-journey/my-journey';
import { JourneySetupStartPage } from './../pages/journey-setup-start/journey-setup-start';
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
import { MediaCapture } from '@ionic-native/media-capture';
import { Camera } from '@ionic-native/camera';
import { Device } from '@ionic-native/device';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { MocSqliteDataServiceProvider } from '../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { JourneyDataServiceProvider } from '../providers/journey-data-service/journey-data-service';

import { MockJourniesProvider } from '../providers/static-data/mock-journies/mock-journies';
import { MockCategoriesProvider } from '../providers/static-data/mock-categories/mock-categories';
import { MockDataServiceProvider } from '../providers/static-data/mock-data-service/mock-data-service';
import { CategoryDataServiceProvider } from '../providers/category-data-service/category-data-service';
import { AuthProvider } from '../providers/auth/auth';
import { AuthLockProvider } from '../providers/auth-lock/auth-lock';
import { UserProvider } from '../providers/user/user';
import { PostOptionModalPage } from '../pages/post-option-modal/post-option-modal';
import { PostRecordPage } from '../pages/post-record/post-record';

// Ionic Pro Monitoring imports
import { Pro } from '@ionic/pro';
import { Injectable, Injector } from '@angular/core';

Pro.init('cb3692c5', {
  appVersion: '0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // BaseCategoryPage,
    CategoriesPage,
    JourneyListPage,
    MyJourneyPage,
    JourneySetupStartPage,
    PostOptionModalPage,
    PostRecordPage,
    JourneySliderComponent,
    FeaturedJourneyComponent,
    FooterMenuComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JourneyDetailPageModule,
    BaseCategoryPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BaseCategoryPage,
    CategoriesPage,
    JourneyListPage,
    JourneySliderComponent,
    JourneyDetailPage,
    PostOptionModalPage,
    PostRecordPage,
    MyJourneyPage,
    JourneySetupStartPage,
    FooterMenuComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MediaCapture,
    Camera,
    Device,
    IonicErrorHandler,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    DataServiceProvider,
    MockJourniesProvider,
    MockCategoriesProvider,
    MockDataServiceProvider,
    MocSqliteDataServiceProvider,
    JourneyDataServiceProvider,
    CategoryDataServiceProvider,
    AuthProvider,
    AuthLockProvider,
    UserProvider
  ]
})
export class AppModule {}
