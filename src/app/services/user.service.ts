import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { User } from '../classes/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
  url = '/api/users';
  sendtoken = JSON.parse(sessionStorage.getItem('token'));
  constructor(private http: Http) {}
  addUser(user: User): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/register', user, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loginUser(user: User): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/login', user, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  loginUserFB(user = {id: '', userr: {name: '', _id: '', admin: false, token: '', email: '', password: ''}}): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': JSON.parse(sessionStorage.getItem('socialToken')) });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/loginFB', user, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getUser(): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/all', options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getTheUser(name: string): Observable<Comment[]> {
    const headers = new Headers({ 'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    // ...using get request
    return this.http.get(this.url + '/name/' + name, options)
    // ...and calling .json() on the response to return data
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  deleteUser(id: string) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    return this.http.delete(this.url + '/' + id, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  modifyUser(user: User) {
    const headers = new Headers({ 'Content-Type': 'application/json', 'authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    console.log(user._id);
    console.log(this.sendtoken);
    return this.http.post(this.url + '/' + user._id, user, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  sendMessage(message = {name: '', email: '', message: '' }): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/contact', message, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  token_link(message = {email: ''}): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/auth/forgotPassword', message, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  reset_password(message = {token: '', password: ''}): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/auth/reset_password', message, options)
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
