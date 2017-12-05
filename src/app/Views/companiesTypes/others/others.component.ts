import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../classes/product.model';
import {NavbarComponent} from '../../navbar/navbar.component';


@Component({
  moduleId: module.id,
  selector: 'app-companies-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css'],
  providers: [ProductService]
})
export class CompaniesOthersComponent implements OnInit {
  ngOnInit() {}
}
