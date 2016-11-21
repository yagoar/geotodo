import { UUID } from 'angular2-uuid';

export class Location {

    id:string;

    constructor(
        public name:string, 
        public latitude:number, 
        public longitude:number, 
        public radius:number) {
            this.id = UUID.UUID();
    }

}