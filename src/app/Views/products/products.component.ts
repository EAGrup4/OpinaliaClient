import {Component, OnInit} from '@angular/core';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  moduleId: module.id,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})

export class ProductsComponent implements OnInit {
  prodClicked = new Product('', '', '', [], [], [], '');
  prod = new Product('', '', '', [], [], [], '');
  product: any;
  products: any;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
  }
  productClicked(prod: Product) {
    this.prodClicked = prod;
    console.log(this.prodClicked);
  }
}
