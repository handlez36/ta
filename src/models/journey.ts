export class Journey {

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
                },
                hasMany: {
                    post: {
                        foreignKey: 'journy_id',
                        localField: 'posts'
                    }
                }
            }
        }
    }

}