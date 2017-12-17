import { UserProvider } from './../../providers/user/user';
import { Journey } from './../../models/journey';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component, NgZone } from '@angular/core';
import { Input } from '@angular/core';
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

  journey;

  constructor(
    private dataService: MocSqliteDataServiceProvider,
    private userService: UserProvider,
    private authService: AuthLockProvider,
    private ngZone: NgZone
  ) 
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

}
