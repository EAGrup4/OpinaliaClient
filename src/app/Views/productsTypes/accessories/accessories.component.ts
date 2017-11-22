import {Component, OnInit, Input} from '@angular/core';
import {Product} from '../../../classes/product.model';
import {ProductService} from '../../../services/product.service';

@Component({
  moduleId: module.id,
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css'],
  providers: [ProductService]
})

export class AccessoriesComponent implements OnInit {
  prodClicked = new Product('', '', '', [], [], null, '');
  prod = new Product('', '', '', [], [], null, '');
  product: any;
  products: any;
  data: any;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.searchProductByCategory('Accesorios').subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
  }
  productClicked(prod: Product) {
    this.prodClicked = prod;
    console.log(this.prodClicked);
  }
  aplhabetOrder() {
    this.productService.searchProductByCategory('Accesorios').subscribe(
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
    const category = 'Portatil';
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
