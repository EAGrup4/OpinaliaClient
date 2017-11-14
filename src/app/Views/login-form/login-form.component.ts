import {Component, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import { Product } from '../../classes/user.model';
import { UserService } from '../../services/user.service';
import {CloseGuard, DialogRef, ModalComponent} from 'angular2-modal';
import {BSModalContext} from 'angular2-modal/plugins/bootstrap';
import {IAlert} from '../table-users/table-users.component';



@Component({
  selector: 'app-login-form',
  providers: [UserService],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  public loginformShow = false;
  user = new Product('', '', '', '', false, '');
  error: string;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private userService: UserService) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }

  get currentUser(){
    return JSON.stringify(this.user);
  }
  addUser(name: string, email: string, password: string, id: string) {
    this.user.email = email;
    this.user.name = name;
    this.user.password = password;
    this.user._id = id;
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        // this.error = data.name; ARREGLAR SI SE PRODUCE ALGUN ERROR
        if (this.error === 'CastError') {
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Error al registrar usuario',
          });
        } else {
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Usuario Registrado!',
          });
        }
      }
    );
  }
  enterUser(email: string, password: string) {
    this.user.email = email;
    this.user.password = password;
    console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      (data) => console.log(data)
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
