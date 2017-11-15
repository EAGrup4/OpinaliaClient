import {Component, OnInit} from '@angular/core';
import {LoginFormComponent} from '../login-form/login-form.component';
import {Browser} from 'selenium-webdriver';
import {Product} from '../../classes/product.model';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {LocalStorage, SessionStorage} from 'angular2-localstorage';
import {User} from '../../classes/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ProductService]
})

export class NavbarComponent implements OnInit {
  user = new User('', '', '', '', false, '');
  savedUser = sessionStorage.getItem('user');
  showEnter = true;
  ngOnInit() {
    this.user = JSON.parse(this.savedUser);
    console.log(this.user);
    if (this.user != null) {
      this.showEnter = false;
      console.log('SavedName: ' + this.user.name);
    }
  }
  leaveSession() {
    sessionStorage.clear();
  }
}

