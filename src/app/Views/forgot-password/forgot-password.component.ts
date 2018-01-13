import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {IAlert} from '../adminPage/table-users/table-users.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [UserService]
})
export class ForgotPasswordComponent implements OnInit {
  public emailC;
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;


  constructor(private userService: UserService,  private navbarComponent: NavbarComponent) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  ngOnInit() {
  }
  postMessage () {
    const messageToSend = {email: ''};
    messageToSend.email = this.emailC;
    this.userService.token_link(messageToSend).subscribe((data) => {
        console.log(data);
        this.alerts.pop();
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Te hemos enviado un enlace a tu correo',
        });
        setTimeout(() => this.alerts.pop(), 15000);
      },
      (err) => {
        console.log(err);
        this.alerts.pop();
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'No se ha podido enviar el mensaje!',
        });
        setTimeout(() => this.alerts.pop(), 7000);
      }
    );
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
