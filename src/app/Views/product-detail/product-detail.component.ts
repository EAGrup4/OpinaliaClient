import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Ratings} from '../../classes/ratings.model';
import {User} from '../../classes/user.model';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [ProductService]
})

export class ProductDetailComponent implements OnInit, OnChanges {
  @Input () prodSelected = new Product('', '', '', [], [], null, '');
  prod = new Product('', '', '', [], [], null, '');
  user = new User('', '', '', '', false, '');
  rating = new Ratings('', '', 0);
  product: any;
  products: any;
  id: String;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private productService: ProductService) {}
  ngOnInit() {
  }

  ngOnChanges() {
    this.prod = this.prodSelected;
    console.log(this.prod);
    this.productService.getProductByName(this.prod.name).subscribe(// ng -g component name
      (data) => {
        this.product = data;
        console.log(data);
      });
  }
  passID(id: string) {
    this.id = id;
  }
  sendComment(comment: string, mark: number) {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    if (this.user !== null) {
      this.rating.userId = this.user._id;
      this.rating.comment = comment;
      this.rating.mark = mark;
      this.prod.ratings = this.rating;
      console.log(this.prod.ratings);
      this.productService.sendComment(this.prod, this.prod._id).subscribe(// ng -g component name
        (data) => {
          console.log(data);
        });
    } else {
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'PARA PODER OPINAR TIENES QUE ENTRAR EN TU CUENTA DE OPINALIA',
      });
    }
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
