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
}