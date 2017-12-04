import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../classes/user.model';
import {UserService} from '../../services/user.service';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UserService]
})

export class EditProfileComponent implements OnInit {
  users = new User('', '', '', '', false, '', '');
  id: any;
  sub: any;
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  constructor(private userService: UserService, private router: Router) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  ngOnInit() {
    this.id = sessionStorage.getItem('id');
  }
  passUser(name: string, email: string, password: string, password22: string) {
    if (password === password22) {
      this.users.email = email;
      this.users.name = name;
      this.users.password = password;
    } else {
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'Las contraseñas no coinciden!',
      });
    }
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
        this.alerts.pop();
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Usuario modificado!',
        });
        sessionStorage.setItem('user', JSON.stringify(data));
        this.router.navigate(['']);
        window.location.reload();
      },
      (err) => {
        console.log(err);
        this.alerts.pop();
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'No se ha podido modificar el usuario!',
        });
      });
  }
  deleteUser() {
    this.users._id = this.id;
    console.log(this.id);
    this.userService.deleteUser(this.users._id).subscribe(
      (data) => {
        console.log(data);
        sessionStorage.clear();
        this.router.navigate(['']);
        window.location.reload();
      },
      (err) => {
        console.log(err);
        this.alerts.pop();
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'No se ha podido eliminar el usuario!',
        });
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
