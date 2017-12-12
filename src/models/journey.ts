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

    static mapperOptions(ds = null) {
        return {
            endpoint: 'journies',
            schema: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    category_id: { type: 'number' },
                    user_id: { type: 'string' }
                }
            },
            relations: {
                belongsTo: {
                    category: {
                        foreignKey: 'category_id',
                        localField: 'category'
                    },
                    user: {
                        foreignKey: 'user_id',
                        localField: 'user'
                    }
                }
            }
        }
    }

}