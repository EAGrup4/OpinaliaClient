import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../classes/product.model';

@Component({
  moduleId: module.id,
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})

export class PrincipalComponent implements OnInit {
  product: any;
  products: any;
  boolsearch = false;
  prodClicked = new Product('', '', '', [], null, [], null, '', null, null, null);
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getBestProducts().subscribe(
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
  }
  searchProd(searchedProduct) {
    localStorage.setItem('searchedProd', searchedProduct);
    this.boolsearch = true;
  }
}
