import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../classes/product.model';

@Component({
  moduleId: module.id,
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css'],
})

export class PrincipalComponent implements OnInit{
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
}
