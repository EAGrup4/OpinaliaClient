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
  sendtoken = JSON.parse(sessionStorage.getItem('token'));

  constructor(private http: Http) {
  }
  addProduct(product: {name, category, company}): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
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
    return this.http.get(this.url + '/name/' + name, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  deleteProduct(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + '/' + id, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  modifyProduct(product: {name, category, company, _id}) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    console.log(product._id);
    return this.http.post(this.url + '/' + product._id, product, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  sendComment(rating: {userId, title, comment, rate}, productId) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    console.log(productId);
    console.log('token', this.sendtoken);
    return this.http.post(this.url + '/rating/' + productId, rating, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchProduct(text: string, category: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(text);
    return this.http.get(this.url + '/searchProduct/' + text + '/' + category, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchProductByCategory(category: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/category/' + category, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchProductByCompany(company: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/company/' + company, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBest7Products(): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/best7', options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBestProducts(): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/best', options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBest7TypeProducts(category: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/best7/' + category, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBestTypeProducts(category: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/bestCategory/' + category, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBestCompanyProducts(company: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/bestCompany/' + company, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchProduct2(text: string, company: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(text);
    return this.http.get(this.url + '/searchProduct2/' + text + '/' + company, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
