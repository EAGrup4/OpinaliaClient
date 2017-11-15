import {Component, ComponentFactoryResolver, NgModule, Optional, ViewChild, ViewContainerRef} from '@angular/core';
import {LoginFormComponent} from '../login-form/login-form.component';
import {Browser} from 'selenium-webdriver';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ProductService]
})

export class NavbarComponent {
  products = new Product('', '', '', [], [], [], '');
  product: any;
  constructor(private productService: ProductService, private router: Router) {}
}

