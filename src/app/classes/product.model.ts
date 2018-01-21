import {Ratings} from './ratings.model';
import {Specifications} from './specifications.model';

export class Product {
  constructor(
    public name: string,
    public category: string,
    public company: string,
    public specifications: Specifications[],
    public date: { type: Date },
    public images: string[],
    public ratings: Ratings[],
    public _id: string,
    public numRates: {type: Number, default: 0},
    public totalRate: {type: Number, default: 0},
    public avgRate: {type: Number, default: -1},
  ) {}
}
