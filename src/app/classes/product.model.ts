import {Ratings} from './ratings.model';

export class Product {
  constructor(
    public name: string,
    public category: string,
    public company: string,
    public specifications: string[],
    public images: string[],
    public ratings: Ratings,
    public _id: string
  ) {}
}
