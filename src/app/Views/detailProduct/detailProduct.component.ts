import {Component, Input, OnInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Ratings} from '../../classes/ratings.model';
import {User} from '../../classes/user.model';
import {Router} from '@angular/router';
import {ProductShareService} from '../../services/productShare.service';
import {Location} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'app-detailProduct',
  templateUrl: './detailProduct.component.html',
  styleUrls: ['./detailProduct.component.css'],
  providers: [ProductService, ProductShareService]
})

export class DetailProductComponent implements OnInit {
  @Input () prodSelected = new Product('', '', '', [], null, [], null, '', null, null, null);
  prod = new Product('', '', '', [], null, [], null, '', null, null, null);
  user = new User('', '', '', '', false, '');
  rating = new Ratings('', '', 0, null);
  ratings: any;
  rate: any;
  product: any;
  products: any;
  data2: any;
  id: String;
  val = 50;
  chVal: number;
  averageRatingPerCent: number;
  numberProgressBar: string;
  opNumberProgressBar: string;
  day: any;
  month: any;
  year: any;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private _location: Location, private productService: ProductService, private productShareService: ProductShareService,
              private navbarComponent: NavbarComponent) {}
  ngOnInit() {
    this.prod = JSON.parse(localStorage.getItem('product'));
    console.log(this.prod);
    this.productService.getProductByName(this.prod.name).subscribe(
      (data) => {
        this.product = data;
        console.log(data);
        this.averageRatingPerCent = this.product[0].avgRate * 10;
        if (this.product[0].avgRate === -1) {
          this.product[0].avgRate = 0;
        }
        /*this.showDate(this.product[0].ratings.date);*/
      });
    this.chVal = 5;
  }
  getAvgRate() {
    this.numberProgressBar = this.averageRatingPerCent + '%';
    return this.numberProgressBar;
  }
  getRate(rate: number) {
    this.opNumberProgressBar = rate * 10 + '%';
    return this.opNumberProgressBar;
  }
  goBack() {
    this._location.back();
    this.navbarComponent.ableStyle();
  }
  scrollElement(el) {
    el.scrollIntoView();
  }
  passID(id: string) {
    this.id = id;
  }
  sendComment(comment: string, mark: number) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user !== null) {
      this.rating.userId = this.user._id;
      this.rating.comment = comment;
      this.rating.mark = mark;
      this.prod.ratings = this.rating;
      console.log(this.prod.ratings);
      this.productService.sendComment(this.prod, this.prod._id).subscribe(// ng -g component name
        (data) => {
          console.log(data);
        });
    } else {
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'PARA PODER OPINAR TIENES QUE ENTRAR EN TU CUENTA DE OPINALIA',
      });
    }
  }
  /*public showDate(date: string) {
    const parts = date.split('-');
    this.year = parts[0];
    this.month = parts[1];
    const moreParts = parts[2].split('T');
    this.day = moreParts[0];
    console.log(this.year + '-' + this.month + '-' + this.day);
  }*/
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
