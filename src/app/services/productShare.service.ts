import { Injectable } from '@angular/core';
import {Product} from '../classes/product.model';

@Injectable()
export class ProductShareService {
  serviceProduct: Product;
  getSharedProduct() {
    console.log('IN SERVICE');
    console.log(this.serviceProduct);
    return this.serviceProduct;
  }
  setSharedProduct(data: Product) {
    this.serviceProduct = data;
  }
}
