import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {NavbarComponent} from '../navbar/navbar.component';



@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ProductService]
})
export class ContactComponent implements OnInit {
  constructor(private navbarComponent: NavbarComponent) {
  }
  ngOnInit() {
    this.navbarComponent.disableStyle();
    this.navbarComponent.disableStyle2();
    this.navbarComponent.disableStyle3();
  }
}
