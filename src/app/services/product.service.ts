import {Injectable, Input} from '@angular/core';
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
  passCode: any;
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
  getProductById(id: String): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/id/' + id, options)
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
  likeButton(productId, ratingId) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/rating/like/' + productId + '/' + ratingId, null, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  dislikeButton(productId, ratingId) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/rating/dislike/' + productId + '/' + ratingId, null, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  addSpecs(productId, spec) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(this.url + '/spec/' + productId, spec, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchProduct(text: string, category: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(text);
    return this.http.get(this.url + '/category/' + text + '/' + category ,options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchProductByCategory(category: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(this.url + '/category/' + category);
    return this.http.get(this.url + '/category/' + category, options)
      .map((res: Response) => {
        res.json();
      })
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
    return this.http.get(this.url + '/category/best7/' + category, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBestTypeProducts(category: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/category/best/' + category, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBestCompanyProducts(company: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/company/best/' + company, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  searchProduct2(text: string, company: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    console.log(text);
    return this.http.get(this.url + '/company/' + text + '/' + company, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getNewProducts(): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
      return this.http.get(this.url + '/new/5', options)
      // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getNewTypeProducts(category: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
      return this.http.get(this.url + '/newCategory/' + category, options)
      // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getNewCompanyProducts(company: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
      return this.http.get(this.url + '/newCompany/' + company, options)
      // ...and calling .json() on the response to return data
        .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getBestRatings(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/ratings/best/' + id, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getWorstRatings(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/ratings/worst/' + id, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getNewRatings(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/ratings/new/' + id, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getOldRatings(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/ratings/old/' + id, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
