///<reference path="../detailProduct/detailProduct.component.ts"/>
import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from '../login-form/login-form.component';
import {Browser} from 'selenium-webdriver';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {User} from '../../classes/user.model';
import {element} from 'protractor';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ProductService],
})

export class NavbarComponent implements OnInit {
  user = new User('', '', '', '', false, '');
  savedUser = sessionStorage.getItem('user');
  isAdmin = false;
  showEnter = true;
  router: Router;
  showAdmin = false;
  showStyle = false;
  showStyle2 = false;
  subscription: any;
  constructor(_router: Router) {
    this.router = _router;
  }
  ngOnInit() {
    this.user = JSON.parse(this.savedUser);
    if (this.user != null) {
      this.showEnter = false;
      console.log(this.user);
      if (this.user.admin === true) {
        console.log(this.user.admin);
        this.showAdmin = true;
      }
    }
    this.disableStyle();
    this.disableStyle2();
  }
  leaveSession() {
    sessionStorage.clear();
    window.location.reload();
  }
  editProfile() {
    sessionStorage.setItem('id', this.user._id);
    this.router.navigate(['edit-profile']);
  }
  getStyle() {
    if (this.showStyle) {
      return 'block';
    } else {
      return 'inline';
    }
  }
  disableStyle() {
    this.showStyle = false;
  }
  ableStyle() {
    this.showStyle = true;
  }
  getStyle2() {
    if (this.showStyle2) {
      return 'block';
    } else {
      return 'inline';
    }
  }
  disableStyle2() {
    this.showStyle2 = false;
  }
  ableStyle2() {
    this.showStyle2 = true;
  }
}

