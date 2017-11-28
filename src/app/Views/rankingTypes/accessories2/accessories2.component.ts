import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../classes/product.model';
import {NavbarComponent} from '../../navbar/navbar.component';


@Component({
  moduleId: module.id,
  selector: 'app-ranking-accessories',
  templateUrl: './accessories2.component.html',
  styleUrls: ['./accessories2.component.css'],
  providers: [ProductService]
})

export class RankingAccessoriesComponent implements OnInit {
  product: any;
  prod = new Product('', '', '', [], null, [], null, '', null, null, null);
  prodClicked = new Product('', '', '', [], null, [], null, '', null, null, null);
  constructor(private productService: ProductService, private navbarComponent: NavbarComponent) {
  }
  ngOnInit() {
    this.productService.getBestTypeProducts('Accesorios').subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
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
