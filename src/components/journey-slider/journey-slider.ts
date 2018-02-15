import { MocSqliteDataServiceProvider } from '../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { UserProvider } from './../../providers/user/user';
import { Input } from '@angular/core';
import { Journey } from './../../models/journey';
import { CategoryDataServiceProvider } from './../../providers/category-data-service/category-data-service';
import { JourneyDataServiceProvider } from './../../providers/journey-data-service/journey-data-service';
import { Observable } from 'rxjs/Observable'; 
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';;

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

  journies = [];
  categories = [];
  users = [];

  constructor(
    private dataService: MocSqliteDataServiceProvider,
    private userDataService: UserProvider,
    private navCtrl: NavController) { }

  ngOnInit() {
    console.log("Journey slider: ngOnInit");
    
    this.dataService.getAll('journey', {}, { force: true, with: ['category', 'user'] })
      .subscribe( journies => {console.log("Journies: ", journies); this.journies = journies || []} )
  }

  gotoJourneyDetails(id) {
    console.log( `Click journey ${id}` );
    
    this.navCtrl.push( 'JourneyDetailPage', { id: id} )
  }

}
