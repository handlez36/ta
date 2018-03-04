export class Category {

    constructor(
        public name: string,        
        public id?: number,
        public imageUrl?: string)
    {

    }

    parameterize(): {} {
        let params = 
        {
            'category':
            {
                'name': this.name
            }
        };
        return params;
    }

    static mapperOptions() {
        return {
          endpoint: 'categories',
          schema: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              description: { type: ['string', 'null'] },
              bg_image: { type: ['string', 'null'] }
            }
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