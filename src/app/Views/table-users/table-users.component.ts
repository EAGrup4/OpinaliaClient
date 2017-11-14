import {Component, Input} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Product} from '../../classes/user.model';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.css'],
  providers: [UserService],
})
export class TableUsersComponent {
  users = new Product('', '', '', '', false, '');
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  constructor(private userService: UserService) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  user: any;
  error: string;
  id: string;
  showUsers() {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
        console.log(data);
      });
  }
  deleteUsers(id: string, index: number) {
    this.users._id = id;
    console.log(id);
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log(data);
        this.user.splice(index, 1);
      });
  }
  passID(id: string) {
    this.id = id;
  }
  modifyUsers(name: string, email: string, password: string) {
    this.users.email = email;
    this.users.name = name;
    this.users.password = password;
    this.users._id = this.id;
    console.log(this.users);
    this.userService.modifyUser(this.users).subscribe(
      (data) => {
        console.log(data);
        this.error = data.name;
        if (this.error === 'CastError') {
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Error al editar usuario',
          });
        } else {
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Usuario modificado!',
          });
        }
      });
  }
  changeAdmin(id: string, name: string, email: string, admin: boolean) {
    this.users.email = email;
    this.users.name = name;
    this.users._id = id;
    if (admin) {
      this.users.admin = false;
    }else {
      this.users.admin = true;
    }

    console.log(this.users);
    this.userService.modifyUser(this.users).subscribe(
      (data) => {
        console.log(data);
        this.error = data.name;
        this.user = data;
      });
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
