import {Component, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import { User } from '../../classes/user.model';
import { UserService } from '../../services/user.service';
import {CloseGuard, DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {IAlert} from '../adminPage/table-users/table-users.component';
import {Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

declare const FB: any;

@Component({
  selector: 'app-login-form',
  providers: [UserService],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {
  public loginformShow = false;
  user = new User('', '', '', '', false, '', '');
  error: string;
  public display;
  public name;
  public imagen;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private userService: UserService, private router: Router, private navbarComponent: NavbarComponent) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  ngOnInit() {
    this.navbarComponent.disableStyle();
    this.navbarComponent.disableStyle2();
    this.navbarComponent.disableStyle3();
    FB.init({
      // appId: '565381053812647',
      appId: '1817613605202343',
      status: true,
      xfbml: true,
      cookie: false,
      version: 'v2.11'
    });
  }
  get currentUser(){
    return JSON.stringify(this.user);
  }
  addUser(name: string, email: string, password: string, password2: string, id: string) {
    this.user.email = email;
    this.user.name = name;
    this.user.password = password;
    this.user._id = id;
    console.log(this.user);
    if (password === password2) {
      this.userService.addUser(this.user).subscribe(
        (data) => {
          console.log(data);
          this.alerts.pop();
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Usuario Registrado!',
          });
          let getData: any = {};
          getData = data;
          const token = getData.token;
          const userTmp = getData;
          sessionStorage.setItem('user', JSON.stringify(userTmp));
          sessionStorage.setItem('token', JSON.stringify(token));
          this.router.navigate(['']);
          window.location.reload();
        },
        (err) => {
          console.log(err);
          this.alerts.pop();
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'No se ha podido registrar!',
          });
        }
      );
    } else {
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'Las contraseñas no coinciden!',
      });
    }
  }
  enterUser(email: string, password: string) {
    this.user.email = email;
    this.user.password = password;
    console.log(this.user);
    this.userService.loginUser(this.user).subscribe(
      (data) => {
        console.log(data);
        sessionStorage.clear();
        this.alerts.pop();
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Usuario logueado!',
        });
        let getData: any = {};
        getData = data;
        const userTmp = getData;
        const token = getData.token;
        console.log('token', token);
        sessionStorage.setItem('user', JSON.stringify(userTmp));
        sessionStorage.setItem('token', JSON.stringify(token));
        this.router.navigate(['']);
        window.location.reload();
      },
    (err) => {
      console.log(err);
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'Error al loguear!',
      });
    }
    );
  }
  closeForm() {
    this.loginformShow = false;
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  me() {
    FB.api('/me?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
      (result) => {
        if (result && !result.error) {
          this.name = result.name;
          this.display = true;
          this.imagen = result.picture.data.url;
          console.log(result);
        } else {
          console.log(result.error);
        }
      });
  }
  FBlogin() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        const sendUser = {name: '', _id: '', admin: false, token: '', email: '', password: ''};
        FB.api('/me?fields=id,name,first_name,email,gender,picture.width(150).height(150),age_range,friends',
          (result) => {
            if (result && !result.error) {
              sendUser.name = result.name;
              sendUser._id = null;
              sendUser.email = result.email;
              sendUser.password = result.id;
              console.log(result);
              this.userService.loginUserFB(sendUser).subscribe(
                (data) => {
                  console.log(data);
                  sessionStorage.clear();
                  this.alerts.pop();
                  this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Usuario logueado!',
                  });
                  let getData: any = {};
                  getData = data;
                  const userTmp = getData;
                  const token = getData.token;
                  console.log('token', token);
                  sessionStorage.setItem('user', JSON.stringify(userTmp));
                  sessionStorage.setItem('token', JSON.stringify(token));
                  this.router.navigate(['']);
                  window.location.reload();
                },
                (err) => {
                  console.log(err);
                  this.alerts.pop();
                  this.alerts.push({
                    id: 2,
                    type: 'danger',
                    message: 'Error al loguear!',
                  });
                });
            }else {
              console.log(result.error);
            }
        });
        console.log(response.authResponse.accessToken); // token obtenido
        console.log(sendUser);
      }else {
        FB.login(function(response) {
          if (response.authResponse) {
            this.me();
          }
        }, {scope: 'email'});
      }
    });
  }
}
