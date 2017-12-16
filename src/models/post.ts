import { HttpAdapter } from 'js-data-http';

export class Post {

    constructor() {
    }

    static mapperOptions() {
        return {
            endpoint: 'posts',
            schema: {
                type: 'object',
                properties: {
                    id:         { type: 'number' },
                    title:      { type: 'string' },
                    content:    { type: 'string' },
                    video_url:  { type: ['string', 'null'] },
                    image_urls: { type: 'array' },
                    journey_id: { type: 'number' }
                }
            },
            relations: {
                belongsTo: {
                    journey: {
                        foreignKey: 'journy_id',
                        localField: 'journey'
                    }
                }
            }
        }
    }
}