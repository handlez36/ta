import { MocSqliteDataServiceProvider } from '../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Input } from '@angular/core';
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

  private journies: any       = [];
  private categories: any     = [];
  private users: any          = [];

  constructor(
    private dataService: MocSqliteDataServiceProvider,
    private navCtrl: NavController) { }

  ngOnInit() {
    console.log("JourneySliderComponent#ngOnInit");
    
    this.dataService.getAll('journey', {}, { force: true, with: ['category', 'user'] })
      .subscribe( journies => this.journies = journies || [] )
  }

  gotoJourneyDetails(id) {
    console.log("JourneySliderComponent#gotoJourneyDetails -- clicked on journey " + id );
    
    this.navCtrl.push( 'JourneyDetailPage', { id: id} )
  }

}
