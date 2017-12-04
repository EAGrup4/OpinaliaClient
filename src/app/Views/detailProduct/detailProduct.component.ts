import {Component, Input, OnInit, OnChanges, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
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
  producte = new Product('', '', '', [], null, [], null, '', null, null, null);
  user = new User('', '', '', '', false, '', '');
  rating = new Ratings('', '', '', 0, null);
  ratingSend = {userId: '', title: '', comment: '', rate: 0};
  ratin = new Ratings('', '', '', 0, null);
  ratings: any;
  rate: any;
  product: any;
  products: any;
  data2: any;
  id: String;
  val = 50;
  chVal: number = null;
  averageRatingPerCent: number;
  numberProgressBar: string;
  opNumberProgressBar: string;
  range: any;
  nameUser: string;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private _location: Location, private productService: ProductService, private productShareService: ProductShareService,
              private navbarComponent: NavbarComponent) {}
  ngOnInit() {
    this.prod = JSON.parse(localStorage.getItem('product'));
    console.log('THIS.PROD', this.prod);

    this.productService.getProductByName(this.prod.name).subscribe(
      (data) => {
        this.product = data;
        console.log(data);
        this.producte = this.product[0];
        console.log('Producte',  this.product[0].name);
        console.log('Name Opinion',  this.product[0].ratings[0].userId.name);
        this.averageRatingPerCent = this.product[0].avgRate * 10;
        if (this.product[0].avgRate === -1) {
          this.product[0].avgRate = 0;
        }
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
  sendComments(title: string, comment: string, mark: number) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user !== null) {
      this.ratingSend.userId = this.user._id;
      this.ratingSend.title = title;
      this.ratingSend.comment = comment;
      this.ratingSend.rate = mark;
      console.log(this.ratingSend);
      this.productService.sendComment(this.ratingSend, this.prod._id).subscribe(// ng -g component name
        (data) => {
          console.log(data);
          this.alerts.pop();
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'OPINION REALIZADA',
          });
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
