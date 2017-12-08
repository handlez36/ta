import { UserProvider } from './../../providers/user/user';
import { Journey } from './../../models/journey';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Component, NgZone } from '@angular/core';
import { Input } from '@angular/core';
import 'rxjs/add/operator/filter';
import { AuthLockProvider } from '../../providers/auth-lock/auth-lock';

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

  @Input() featuredJourney;
  @Input() featuredUser;

  journey;
  category;
  user;
  user_alias;
  user_picture;

  constructor(
    private journiesDataService: JourneyDataServiceProvider,
    private categoryDataService: CategoryDataServiceProvider,
    private userService: UserProvider,
    private authService: AuthLockProvider,
    private ngZone: NgZone
  ) 
  {
  }

  ngOnInit() {
    // this.ngZone.run( () => {
      this.journey = this.featuredJourney;
      
      // Get category...
      if(this.journey) {
        this.categoryDataService.getItemWithParams('category_id', this.journey.category)
          .subscribe( categories => {
            this.category = categories[0].name;
          })

        this.userService.getAll({ user_id: [this.journey.user_id] })
          .subscribe( users => {
            this.user = users[0];
            this.user_alias = this.user.nickname;
            this.user_picture = this.user.picture;
            // this.user_picture = 'https://lh5.googleusercontent.com/-ACM19C-PmuQ/AAAAAAAAAAI/AAAAAAAAAIo/QvWGj7kva4U/photo.jpg';
          })
      }
    // })
  }

}
