import { Http } from '@angular/http';
import { MocSqliteDataServiceProvider } from './../../providers/moc-sqlite-data-service/moc-sqlite-data-service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar } from 'ionic-angular';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  @ViewChild(Searchbar) searchBar: Searchbar;
  private searchInput:              string;
  private matchingJournies:         any;
  private matchingCategories:         any;
  private matchingUsers:         any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http: Http,
    private dataService: MocSqliteDataServiceProvider) 
  {
    this.matchingJournies = null;
    this.matchingCategories = null;
    this.matchingUsers = null;
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad SearchResultsPage');
    
    setTimeout( 
      () => { this.searchBar.setFocus() }, 
      200 
    )
  }

  search($event) {
    let inputVal = $event.target.value;
    console.log(`Search for ${inputVal}`);

    if (inputVal.length > 0) {
      this.searchJournies(inputVal);
      this.searchCategories(inputVal);
      this.searchUsers(inputVal);
    }
    else {
      this.resetJournies();
      this.resetCategories();
      this.resetUsers();
    }
    
  }

  resetJournies() { this.matchingJournies = null }
  resetCategories() { this.matchingCategories = null }
  resetUsers() { this.matchingUsers = null }

  searchJournies(searchTerm) {
    console.log("Searching journies...");

    this.dataService.getAll('journey', {title: searchTerm, wildcard: true}, {force: true} )
      .subscribe( journies => {    
        (journies.length == 0) ?
          this.matchingJournies = this.resetJournies() :
          this.matchingJournies = journies
      });
    
    // Excludes the overhead of using js-data to create JS objects with results
    // this.http.get(`http://localhost:3000/journies?title=${searchTerm}&wildcard=true`)
    //   .map( response => response.json())
    //   .subscribe( journies => {
    //     (journies.length == 0) ?
    //       this.matchingJournies = this.resetJournies() :
    //       this.matchingJournies = journies
    // });
  }

  searchCategories(searchTerm) {
    console.log("Searching categories...");

    this.dataService.getAll('category', {name: searchTerm, wildcard: true}, {force: true} )
      .subscribe( categories => {    
        (categories.length == 0) ?
          this.matchingCategories = this.resetCategories() :
          this.matchingCategories = categories
      });
  }

  searchUsers(searchTerm) {
    console.log("Searching users...");

    this.dataService.getAll('user', {nickname: searchTerm, wildcard: true}, {force: true} )
      .subscribe( users => {    
        (users.length == 0) ?
          this.matchingUsers = this.resetUsers() :
          this.matchingUsers = users
      });
  }

}
