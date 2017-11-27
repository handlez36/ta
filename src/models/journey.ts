import { Category } from './category';
import { User } from './user';

export class Journey {

    // posts: Post[];

    constructor(
        public title: string,
        public category: number,
        public description?: string,
        public id?: number,
        public user?: User,
        public duration?: number,
        public update_schedule?: string,
        public active?: boolean)
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
                'user': this.user || null,
                'duration': this.duration || null,
                'update_schedule': this.update_schedule || null,
                'active': this.active || null
            }    
        }

        return params;
    }

    addPost() {

    }

    removePost() {

    }
}