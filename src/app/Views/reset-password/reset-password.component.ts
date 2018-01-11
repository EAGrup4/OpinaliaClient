import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {IAlert} from '../adminPage/table-users/table-users.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UserService]
})
export class ResetPasswordComponent implements OnInit {
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  public resetToken;
  public password;
  public verifyPassword;

  constructor(private userService: UserService,  private navbarComponent: NavbarComponent) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
    this.resetToken = this.getUrlParameter('token');
  }

  ngOnInit() {
  }
  changePassword() {
    if (this.password !== this.verifyPassword) {
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'La contraseña no coincide',
      });
      setTimeout(() => this.alerts.pop(), 5000);
    }else {
      if (this.password === this.verifyPassword) {
        const message = {token: '', password: ''};
        message.token = this.resetToken;
        message.password = this.password;
        this.userService.reset_password(message).subscribe((data) => {
            console.log(data.statusText);
            console.log(data);
            this.alerts.pop();
            this.alerts.push({
              id: 1,
              type: 'success',
              message: 'Password changed',
            });
            setTimeout(() => this.alerts.pop(), 15000);
          },
          (err) => {
            if (err.status = 400) {
              this.alerts.pop();
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'Token expired or is invalid'
              });
              setTimeout(() => this.alerts.pop(), 7000);
            }else {
              this.alerts.pop();
              this.alerts.push({
                id: 2,
                type: 'danger',
                message: 'No se ha podido resetear contraseña!',
              });
              setTimeout(() => this.alerts.pop(), 7000);
            }
          });
      }
    }
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  private getUrlParameter(sParam) {
    return decodeURIComponent(window.location.search.substring(1)).split('&')
      .map((v) => v.split('='))
      .filter((v) => (v[0] === sParam) ? true : false)
      .reduce((prev, curv, index, array) => curv[1], undefined);
  }

}
