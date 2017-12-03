import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../services/product.service';



@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ProductService]
})
export class ContactComponent implements OnInit {
  ngOnInit() {
  }
}
