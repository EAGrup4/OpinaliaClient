import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {Product} from '../../classes/product.model';

@Component({
  moduleId: module.id,
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
  providers: [ProductService]
})

export class RankingComponent implements OnInit {
  product: any;
  prod = new Product('', '', '', [], null, [], null, '', null, null, null);
  prodClicked = new Product('', '', '', [], null, [], null, '', null, null, null);
  constructor(private productService: ProductService, private navbarComponent: NavbarComponent) {
  }
  ngOnInit() {
    this.productService.getBestProducts().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
    this.navbarComponent.ableStyle2();
    this.navbarComponent.disableStyle();
  }
  productClicked(prod: Product) {
    localStorage.clear();
    this.prodClicked = prod;
    console.log(this.prodClicked);
    localStorage.setItem('product', JSON.stringify(this.prodClicked));
    this.navbarComponent.disableStyle2();
    this.navbarComponent.disableStyle();
  }
}
