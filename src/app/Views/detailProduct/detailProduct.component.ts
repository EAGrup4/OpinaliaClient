import {Component, Input, OnInit, OnChanges, DoCheck, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
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
  summaryNumberProgressBar: string;
  range: any; /*NO SE USA*/
  nameUser: string;
  opinions0 = 0; opinions3 = 0; opinions5 = 0;
  opinions7 = 0; opinions9 = 0; numb = 0;
  specProcesador: string; specRam: string;
  specPantalla: string; specPeso: string;
  specSo: string; specDisco: string;
  specTarjetaGrafica: string; specCamara: string;
  spec1= false; spec2 = false; spec3 = false; spec4 = false; spec5 = false; spec6 = false; spec7 = false; spec8 = false;
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
        this.averageRatingPerCent = this.product[0].avgRate * 10;
        this.summaryOpinions(this.product[0]);
        this.iconsSpecifications(this.product[0].specifications[0]);
        this.numb = this.product[0].ratings.length;
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
  getSummaryRate(rate: number) {
        this.summaryNumberProgressBar = rate / this.numb * 100 + '%';
        return this.summaryNumberProgressBar;
      }
  goBack() {
    this._location.back();
    this.navbarComponent.ableStyle();
    localStorage.setItem('searchedProd', '');
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
          this.product = data;
          this.producte = this.product;
          this.averageRatingPerCent = this.product.avgRate * 10;
          this.summaryOpinions(this.product);
          this.numb = this.product.ratings.length;
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
  public iconsSpecifications(spec) {
    if (spec !== ['']) {
      console.log('AAAAAAAAAAAA');
      if (spec.procesador !== '') {
        this.specProcesador = spec.procesador;
        this.spec1 = true;
      }
      if (spec.pantalla !== '') {
        this.specPantalla = spec.pantalla;
        this.spec2 = true;
      }
      if (spec.so !== '') {
        this.specSo = spec.so;
        this.spec8 = true;
      }
      if (spec.ram !== '') {
        this.specRam = spec.ram;
        this.spec3 = true;
      }
      if (spec.disco !== '') {
        this.specDisco = spec.disco;
        this.spec4 = true;
      }
      if (spec.peso !== '') {
        this.specPeso = spec.peso;
        this.spec6 = true;
      }
      if (spec.camara !== '') {
        this.specCamara = spec.camara;
        this.spec5 = true;
      }
      if (spec.tarjetaGrafica !== '') {
        this.specTarjetaGrafica = spec.tarjetaGrafica;
        this.spec7 = true;
      }
    }
  }
  public summaryOpinions(product) {
    let ratings: Ratings[];
    ratings = product.ratings;
    console.log(ratings.length);
    if (ratings.length > 0) {
        for (let i = 0; i < ratings.length; i++) {
            if (ratings[i].rate === 0 || ratings[i].rate === 1 || ratings[i].rate === 2) {
                this.opinions0++;
              }
            if (ratings[i].rate === 3 || ratings[i].rate === 4) {
                this.opinions3++;
              }
            if (ratings[i].rate === 5 || ratings[i].rate === 6) {
                this.opinions5++;
              }
            if (ratings[i].rate === 7 || ratings[i].rate === 8) {
                this.opinions7++;
              }
            if (ratings[i].rate === 9 || ratings[i].rate === 10) {
                this.opinions9++;
              }
          }
      } else {
        this.opinions0 = 0;
        this.opinions3 = 0;
        this.opinions5 = 0;
        this.opinions7 = 0;
        this.opinions9 = 0;
      }
    }
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
