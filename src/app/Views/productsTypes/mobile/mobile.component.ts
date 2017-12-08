import {Component, OnInit, Input} from '@angular/core';
import {Product} from '../../../classes/product.model';
import {ProductService} from '../../../services/product.service';
import {NavbarComponent} from '../../navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
  providers: [ProductService]
})

export class MobileComponent implements OnInit {
  prodClicked = new Product('', '', '', [], null, [], null, '', null, null, null);
  prod = new Product('', '', '', [], null, [], null, '', null, null, null);
  product: any;
  products: any;
  data: any;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private productService: ProductService, private navbarComponent: NavbarComponent) {}

  ngOnInit() {
    this.productService.searchProductByCategory('phone').subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
    this.navbarComponent.ableStyle();
  }
  productClicked(prod: Product) {
    localStorage.clear();
    this.prodClicked = prod;
    console.log(this.prodClicked);
    localStorage.setItem('product', JSON.stringify(this.prodClicked));
    this.navbarComponent.disableStyle();
    this.navbarComponent.disableStyle2();
  }
  aplhabetOrder() {
    this.productService.searchProductByCategory('phone').subscribe(
      (data) => {
        this.data = data.sort();
        this.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.product = this.data;
        console.log(this.product);
      });
  }
  search(text: string) {
    const category = 'Movil';
    if (text === '') {
      text = '0';
    }
    this.productService.searchProduct(text, category).subscribe(
      (data) => {
        this.alerts.pop();
        this.product = data;
        console.log(data);
      },
      (err) => {
        this.product = null;
        this.alerts.pop();
        console.log(err);
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'NO SE OBTIENEN RESULTADOS EN SU BUSQUEDA',
        });
      }
    );
  }
  puntuation() {
    this.productService.getBestTypeProducts('phone').subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
  }
  newest() {
    this.productService.getNewTypeProducts('phone').subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
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
