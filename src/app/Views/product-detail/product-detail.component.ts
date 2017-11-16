import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  moduleId: module.id,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})

export class ProductDetailComponent implements OnInit {
  @Input () prodSelected = new Product('', '', '', [], [], [], '');
  prod = new Product('', '', '', [], [], [], '');
  product: any;
  products: any;
  id: String;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    if (this.prodSelected !== this.prod) {
      console.log(this.prodSelected);
      this.productService.getProductByName(this.prodSelected.name).subscribe(// ng -g component name
        (data) => {
          this.product = data;
          console.log(data);
        });
    }
  }
  passID(id: string) {
    this.id = id;
  }
}
