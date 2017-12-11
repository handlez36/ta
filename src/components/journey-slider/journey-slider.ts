import { UserProvider } from './../../providers/user/user';
import { Input } from '@angular/core';
import { Journey } from './../../models/journey';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Observable } from 'rxjs/Observable'; 
import { Component } from '@angular/core';

/**
 * Generated class for the JourneySliderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'journey-slider',
  templateUrl: 'journey-slider.html'
})
export class JourneySliderComponent {

  @Input() latestJournies;

  journies = [];
  categories = [];
  users = [];

  constructor(
    private journeyDataService: JourneyDataServiceProvider,
    private categoryDataService: CategoryDataServiceProvider,
    private userDataService: UserProvider) { }

  ngOnInit() {
    this.journies = this.latestJournies;

    // this.categoryDataService.getAll()
    //   .subscribe( categories => {
    //     if(categories)
    //       this.categories = categories; 
    //   });

    let user_ids = this.journies.map( journey => journey.user_id )
    this.userDataService.getAll({ user_id: user_ids })
      .subscribe( users => {
        this.users = users;
      });
    
  }

  getCategoryName(category_id) {
    let category = this.categories.find( cat => cat.id === category_id );
    return category ? category.name : "??";
  }

  getAvatarImage(user_id) {
    let user = this.users.find( user => user.user_id === user_id );
    return user ? user.picture : "";
  }

}
