import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {Product} from '../../classes/product.model';

@Component({
  moduleId: module.id,
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
  providers: [ProductService]
})
export class CompaniesComponent implements OnInit {
  prodClicked = new Product('', '', '', [], null, [], null, '', null, null, null);
  product: any;
  data2: any;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private productService: ProductService, private navbarComponent: NavbarComponent) {
  }
  ngOnInit() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
    this.navbarComponent.disableStyle();
    this.navbarComponent.disableStyle2();
    this.navbarComponent.ableStyle3();
  }
  productClicked(prod: Product) {
    localStorage.clear();
    this.prodClicked = prod;
    console.log(this.prodClicked);
    localStorage.setItem('product', JSON.stringify(this.prodClicked));
    this.navbarComponent.disableStyle();
    this.navbarComponent.disableStyle2();
    this.navbarComponent.disableStyle3();
  }
  aplhabetOrder() {
    this.productService.getProduct().subscribe(
      (data) => {

        this.data2 = data.sort();
        this.data2.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.product = this.data2;
        console.log(this.product);
      });
  }
  search(text: string, company: string) {
    console.log(text);
    if (text === '') {
      text = '0';
    }
    this.productService.searchProduct2(text, company).subscribe(
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
