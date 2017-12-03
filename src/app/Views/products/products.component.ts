import {Component, OnInit, Input} from '@angular/core';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {ProductShareService} from '../../services/productShare.service';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  moduleId: module.id,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService, ProductShareService]
})

export class ProductsComponent implements OnInit {
  prodClicked = new Product('', '', '', [], null, [], null, '', null, null, null);
  prod = new Product('', '', '', [], null, [], null, '', null, null, null);
  product: any;
  products: any;
  data2: any;
  avgRate: any;
  objectsFilter = {name: '', category: '', company: ''};
  categoryToSend: any;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private productService: ProductService, private productShareService: ProductShareService,
              private navbarComponent: NavbarComponent) {
  }
  ngOnInit() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
    this.navbarComponent.ableStyle();
    this.navbarComponent.disableStyle2();
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
  search(text: string, category: string) {
    if (text === '') {
      text = '0';
    }
    if (category === 'Sobremesa') {
      this.categoryToSend = 'desktop';
    } else if (category === 'Portatil') {
      this.categoryToSend = 'laptop';
    } else if (category === 'Tablet') {
      this.categoryToSend = 'tablet';
    } else if (category === 'Movil') {
      this.categoryToSend = 'phone';
    } else if (category === 'Accesorios') {
      this.categoryToSend = 'accessories';
    } else if (category === 'Todos') {
      this.categoryToSend = 'Todos';
    }
    this.productService.searchProduct(text, this.categoryToSend).subscribe(
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
