import { CategoryDataServiceProvider } from './../providers/category-data-service/category-data-service';
import { Http } from '@angular/http';
import { Category } from './category';
import { User } from './user';
import { Inject, Injectable } from '@angular/core';
import { ReflectiveInjector } from '@angular/core';
import { ConnectionBackend } from '@angular/http/src/interfaces';

@Injectable()
export class Journey {

    // posts: Post[];

    categoryService;

    constructor(
        public title: string,
        public category: number,
        public description?: string,
        public user_id?: number,
        public id?: number)
    {
    }

    static createBulkJournies(journies) {
        let journeyList = [];

        journies.forEach( journey => journeyList.push(Journey.createSingleJourney(journey)) );

        return journeyList;
    }

    static createSingleJourney(journey) {
        let newJourney = new Journey(
            journey.title,
            journey.category_id,
            journey.description,
            journey.user_id,
            journey.id
        )

        return newJourney;
    }

    parameterize() {
        let params = 
        {
            'journey':
            {
                'title': this.title,
                'category_id': this.category,
                'description': this.description || null,
                'user_id': this.user_id || null
            }    
        }

        return params;
    }

    addPost() {

    }

    removePost() {

    }
}