import { Category } from './category';
import { User } from './user';

export class Journey {

    // posts: Post[];

    constructor(
        public title: string,
        public category: Category,
        public id?: number,
        public user?: User,
        public description?: string,
        public duration?: number,
        public update_schedule?: string,
        public active?: boolean)
    {
        
    }

    addPost() {

    }

    removePost() {

    }
}