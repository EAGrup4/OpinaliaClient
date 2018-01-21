import {Component, Input, OnInit, OnChanges, DoCheck, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Ratings} from '../../classes/ratings.model';
import {User} from '../../classes/user.model';
import {Router} from '@angular/router';
import {ProductShareService} from '../../services/productShare.service';
import {Location} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

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
  rating = new Ratings('', '', '', 0, null, 0, 0, 0, null, '', '', '', false, false);
  ratingSend = {userId: '', title: '', comment: '', rate: 0};
  ratin = new Ratings('', '', '', 0, null, 0, 0, 0, null, '', '', '', false, false);
  ratin2 = new Ratings('', '', '', 0, null, 0, 0, 0, null, '', '', '', false, false);
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
  numRatings: number;
  codeServer: any;
  image: any; imageen: any;
  whiteButton = true;
  redButton = false;
  greenButton = false;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  public myform: FormGroup;
  public titleControl: FormControl;
  public commentControl: FormControl;
  constructor(private _location: Location, private productService: ProductService, private productShareService: ProductShareService,
              private navbarComponent: NavbarComponent) {}
  ngOnInit() {
    this.prod = JSON.parse(localStorage.getItem('product'));
    console.log('THIS.PROD', this.prod);

    this.productService.getProductById(this.prod._id).subscribe(
      (data) => {
        this.product = data;
        console.log(data);
        this.producte = this.product;
        this.averageRatingPerCent = this.product.avgRate * 10;
        this.summaryOpinions(this.product);
        this.iconsSpecifications(this.product.specifications[0]);
        this.numb = this.product.ratings.length;
        if (this.product.avgRate === -1) {
          this.product.avgRate = 0;
        }
        this.searchLikeDislike();
      });
    this.productService.getBestRatings(this.prod._id).subscribe(
      (data) => {
        this.ratin = data[0];
        this.numRatings = data.length;
        console.log(data.length);
        this.ratin2 = data[this.numRatings - 1];
      }
    );
    this.chVal = 5;
    this.createFormControls();
    this.createForm();
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
    localStorage.setItem('searchedProd', '');
  }
  scrollElement(el) {
    el.scrollIntoView();
  }
  passID(id: string) {
    this.id = id;
  }
  private checkComment (comment: string) {
    const banned = ['MMM', 'XXX', 'xxx', 'mmm', 'caca', 'culo']; // se necesita que el server mande un array de palabras a banear
      for (let x = 0; x < banned.length; x++) {
        const regExp = new RegExp(banned[x]);
        comment = comment.replace(regExp, '***');
      }
      return comment;
  }
  sendComments(title: string, comment: string, mark: number) {
    comment = this.checkComment(comment);// check if comment have censored words
    if (this.myform.valid && this.myform.touched) {
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
            setTimeout(() => this.alerts.pop(), 5000);
          }, (err) => {
            if (err.status = 409) {
              this.alerts.pop();
              this.alerts.push({
                id: 1,
                type: 'danger',
                message: 'Ya has comentado',
              });
              setTimeout(() => this.alerts.pop(), 5000);
            }else {
              console.log(err);
            }
          });
      } else {
        this.alerts.pop();
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'PARA PODER OPINAR TIENES QUE ENTRAR EN TU CUENTA DE OPINALIA',
        });
        setTimeout(() => this.alerts.pop(), 8000);
      }
    }else {
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'Rellena correctamente los campos',
      });
      setTimeout(() => this.alerts.pop(), 5000);
    }
  }
  bestRatings() {
    this.productService.getBestRatings(this.prod._id).subscribe(
      (data) => {
        this.product.ratings = data;
      }
    );
  }
  worstRatings() {
    this.productService.getWorstRatings(this.prod._id).subscribe(
      (data) => {
        this.product.ratings = data;
      }
    );
  }
  newRatings() {
    this.productService.getNewRatings(this.prod._id).subscribe(
      (data) => {
        this.product.ratings = data;
      }
    );
  }
  oldRatings() {
    this.productService.getOldRatings(this.prod._id).subscribe(
      (data) => {
        this.product.ratings = data;
      }
    );
  }
  saveUserName(name: string) { // without type info
    console.log('AQUIII', name);
    sessionStorage.setItem('userClick', name);
  }

  likeButton1(rates) {
    console.log('ID RATES1',rates._id);
    this.productService.likeButton(this.prod._id, rates._id).subscribe(
      (data) => {
        this.producte = data;
        this.searchLikeDislike();
      }
    );
  }

  dislikeButton1(rates) {
    console.log('ID RATES2',rates._id);
    this.productService.dislikeButton(this.prod._id, rates._id).subscribe(
      (data) => {
        console.log(data);
        this.producte = data;
        this.searchLikeDislike();
      }
    );
  }
  /*public showDate(date: string) {
    const parts = date.split('-');
    this.year = parts[0];
    this.month = parts[1];
    const moreParts = parts[2].split('T');
    this.day = moreParts[0];
    console.log(this.year + '-' + this.month + '-' + this.day);
  }*/
  public searchLikeDislike() {
    let users = JSON.parse(sessionStorage.getItem('user'));
    let id = users._id;
    console.log('IDDDD', id);
    for (let rate  of this.producte.ratings) {
      let likes: any = [{}];
      likes = rate.likes;
      let dislikes: any = [{}];
      dislikes = rate.dislikes;

      for (let i = 0; i < likes.length; i++) {
        if (likes[i].userId === id) {
          rate.liked = true;
          i = likes.length;
        }
      }

      for (let i = 0; i < dislikes.length; i++) {
        if (dislikes[i].userId === id) {
          rate.disliked = true;
          i = dislikes.length;
        }
      }
    }
  }
  public iconsSpecifications(spec) {
    if (spec !== ['']) {
      for (let i=0; i < 7; i++) {
        if (spec[i].name === 'Procesador') {
          this.specProcesador = spec[i].spec;
          this.spec1 = true;
        }else if (spec[i].name === 'Pantalla') {
          this.specPantalla = spec[i].spec;
          this.spec2 = true;
        }else if (spec[i].name === 'Sistema Operativo') {
          this.specSo = spec[i].spec;
          this.spec8 = true;
        }else if (spec[i].name === 'Memoria Ram') {
          this.specRam = spec[i].spec;
          this.spec3 = true;
        }else if (spec[i].name === 'Disco Duro') {
          this.specDisco = spec[i].spec;
          this.spec4 = true;
        }else if (spec[i].name === 'Peso') {
          this.specPeso = spec[i].spec;
          this.spec6 = true;
        }else if (spec[i].name === 'Camara') {
          this.specCamara = spec[i].spec;
          this.spec5 = true;
        }
        if (spec.tarjetaGrafica !== '') {
          this.specTarjetaGrafica = spec.tarjetaGrafica;
          this.spec7 = true;
        }
      }
    }
  }
  public summaryOpinions(product) {
    let ratings: Ratings[];
    ratings = product.ratings;
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

  createFormControls() {
    this.titleControl = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([4, 15])
    ]);
    this.commentControl = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([6, 300])
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      titleControl: this.titleControl,
      commentControl: this.commentControl
    });
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
