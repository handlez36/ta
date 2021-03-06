import { MocSqliteDataServiceProvider } from './../moc-sqlite-data-service/moc-sqlite-data-service';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CategoryDataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CategoryDataServiceProvider extends MocSqliteDataServiceProvider{

  constructor(private h: Http, private st: Storage) {
    super(h);

    this.setCustomConfigurations();
  }

  setCustomConfigurations() {
    // this.addMapper('category', this.mapperOptions());
  }

  mapperOptions() {
    return {
      endpoint: 'categories',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' }
        },
        relations: {
          hasMany: {
            journey: {
              foreignKey: 'category_id',
              localField: 'journies'
            }
          }
        }
      }
    }
  }

}
