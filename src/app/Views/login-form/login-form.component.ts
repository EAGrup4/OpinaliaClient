import {Component, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import { User } from '../../classes/user.model';
import { UserService } from '../../services/user.service';
import {IAlert} from '../adminPage/table-users/table-users.component';
import {Router} from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';

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
}
