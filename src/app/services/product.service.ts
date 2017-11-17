import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../classes/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Product} from '../classes/product.model';
import {Ratings} from '../classes/ratings.model';

@Injectable()
export class ProductService {
  url = '/api/products';

  constructor(private http: Http) {
  }
  addProduct(product: Product): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/add', product, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getProduct(): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/all', options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getProductByName(name: String): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/' + name, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  deleteProduct(id: string) {
    return this.http.delete(this.url + '/' + id)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  modifyProduct(product: Product) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(product._id);
    return this.http.post(this.url + '/' + product._id, product, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  sendComment(product: Product, productId) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(productId);
    return this.http.post(this.url + '/rating/' + productId, product, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
