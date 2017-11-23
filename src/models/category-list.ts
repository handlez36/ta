import { Category } from './category';
import { Observable } from 'rxjs/Observable';

export class CategoryList {

    categories: Category[];

    categoryList: any;              // observable
    categoryListObserver: any;      // observer

    constructor(categories?: Category[]) {
        if(categories) {
            this.categories = categories;
        }

        this.categoryList = Observable
            .create( observer => this.categoryListObserver = observer);
    }

    add(newCategory) {
        this.categories.push(newCategory);
        this.categoryListObserver.next(true);
    }

    update(index, updatedCategory) {
        this.categories.splice(index, 1, updatedCategory);
        this.categoryListObserver.next(true);
    }

    delete(index) {
        this.categories.splice(index,1);
        this.categoryListObserver.next(true);
    }

    getCategoryUpdates(): Observable<any> {
        return this.categoryList;
    }
}