import { PostRecordPage } from './../../pages/post-record/post-record';
import { App } from 'ionic-angular';
import { Component } from '@angular/core';
import 'rxjs/add/operator/filter';
import { AuthLockProvider } from '../../providers/auth-lock/auth-lock';
import { MocSqliteDataServiceProvider } from '../../providers/moc-sqlite-data-service/moc-sqlite-data-service';

/**
 * Generated class for the FeaturedJourneyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'featured-journey',
  templateUrl: 'featured-journey.html'
})
export class FeaturedJourneyComponent {

  private journey: any;

  constructor(
    private dataService: MocSqliteDataServiceProvider,
    private authService: AuthLockProvider,
    private app: App) 
  {
  }

  ngOnInit() {  
    this.loadJourney();
  }

  loadJourney() {
    this.dataService.getAll('journey', null, { with: ['category', 'user', 'post'] })
      .subscribe( journies => {
        if(journies && journies.length > 0) {
            this.journey = journies[0];
        }
      });
  }

  gotoPost(postType) {
    console.log("FeaturedJourney#gotoPost")
    this.app.getRootNav().setRoot( PostRecordPage );

    switch(postType) {
      case 'video': {
        break;
      }
      case 'audio': {
        break;
      }
      case 'blog': {
        break;
      }
    }
  }

}
