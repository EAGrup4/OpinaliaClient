import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Ratings} from '../../classes/ratings.model';
import {User} from '../../classes/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})

export class ProductDetailComponent implements OnInit, OnChanges {
  @Input () prodSelected = new Product('', '', '', [], [], [], '');
  prod = new Product('', '', '', [], [], [], '');
  user = new User('', '', '', '', false, '');
  rating = new Ratings('', '', 0);
  product: any;
  products: any;
  id: String;
  constructor(private productService: ProductService) {}
  ngOnInit() {
  }

  ngOnChanges() {
    this.prod = this.prodSelected;
    console.log(this.prod);
    this.productService.getProductByName(this.prod.name).subscribe(// ng -g component name
      (data) => {
        this.product = data;
        console.log('AAAAA: ' + data);
      });
  }
  passID(id: string) {
    this.id = id;
  }
  sendComment(comment: string, mark: number) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.rating.userId = this.user._id;
    this.rating.comment = comment;
    this.rating.mark = mark;
    console.log('id: ' + this.rating.userId + 'Comment: ' + comment + 'mark: ' + mark);
    this.productService.sendComment(this.rating, this.prod._id).subscribe(// ng -g component name
      (data) => {
        console.log(data);
      });
  }
}
