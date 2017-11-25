import { Injectable } from '@angular/core';
import {Product} from '../classes/product.model';

@Injectable()
export class ProductShareService {
  public serviceProduct: Product;
}
