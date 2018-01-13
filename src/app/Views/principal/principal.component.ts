import {Component, OnInit, DoCheck} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../classes/product.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

@Component({
  moduleId: module.id,
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})

export class PrincipalComponent implements OnInit, DoCheck {
  product: any;
  products: any;
  boolsearch = false;
  prodClicked = new Product('', '', '', [], null, [], null, '', null, null, null);
  numberSlice: number;
  width = document.documentElement.clientWidth;
  constructor(private productService: ProductService) {
    const $resizeEvent = Observable.fromEvent(window, 'resize')
      .map(() => {
        return document.documentElement.clientWidth;
      })
      .debounceTime(200);
    $resizeEvent.subscribe(data => {
      this.width = data;
    });
  }
  ngDoCheck() {
    if (this.width > 1200) {
      this.numberSlice = 5;
    } else if (this.width > 991 && this.width < 1200) {
      this.numberSlice = 4;
    } else if (this.width > 770 && this.width < 991) {
      this.numberSlice = 3;
    }

  }
  ngOnInit() {
    this.numberSlice = 5;
    this.productService.getBestProducts().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
    this.productService.getNewProducts().subscribe(
            (data) => {
              this.products = data;
              console.log(data);
            });
  }
  productClicked(prod: Product) {
    localStorage.clear();
    this.prodClicked = prod;
    console.log(this.prodClicked);
    localStorage.setItem('product', JSON.stringify(this.prodClicked));
  }
  searchProd(searchedProduct) {
    localStorage.setItem('searchedProd', searchedProduct);
    this.boolsearch = true;
  }
}
