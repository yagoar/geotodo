import { Location } from './location';
import { UUID } from 'angular2-uuid';

export class Todo {

    id:string;

    constructor( 
        public title:string,
        public description:string,
        public location:Location) {
             
        this.id = UUID.UUID();
    }

}