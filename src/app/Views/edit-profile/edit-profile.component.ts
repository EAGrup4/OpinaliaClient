import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../classes/user.model';
import {UserService} from '../../services/user.service';
import {Subject} from 'rxjs/Subject';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';


@Component({
  moduleId: module.id,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [UserService]
})

export class EditProfileComponent implements OnInit {
  users = new User('', '', '', '', false, '', '');
  user = new User('', '', '', '', false, '', '');
  id: any;
  sub: any;
  currentModal = true;
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  url = '';
  public myform: FormGroup;
  public emailControl: FormControl;
  public passwordControl: FormControl;
  public passwordControl2: FormControl;
  public nameControl: FormControl;
  constructor(private userService: UserService, private router: Router, private http: Http) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  filesToUpload: Array<File> = [];
  sendtoken = JSON.parse(sessionStorage.getItem('token'));
  ngOnInit() {
    this.id = sessionStorage.getItem('id');
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log(this.user);
    this.createFormControls();
    this.createForm();
    this.url = this.user.profileImage;
  }
  passUser(name: string, email: string, password: string, password22: string) {
    this.currentModal = true;
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
      this.currentModal = false;
    }
  }
  modifyUsers(name: string, email: string, password: string, password22: string) {
    if (this.myform.valid) {
      this.users.email = email;
      this.users.name = name;
      this.users.password = password;
      this.users._id = this.id;
      this.users.token = JSON.parse(localStorage.getItem('token'));
      if (password === password22) {
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
      } else {
        this.alerts.pop();
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'Las contraseñas no coinciden!',
        });
      }
    } else {
      this.alerts.pop();
      this.alerts.push({
        id: 2,
        type: 'danger',
        message: 'El formulario no se ha rellenado correctamente',
      });
      setTimeout(() => this.alerts.pop(), 5000);
    }
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
  readUrl(event: any) {
    this.filesToUpload = <Array<File>>event.target.files;
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  imageProfile() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    var tempId = this.id;
    console.log(tempId);
    formData.append('uploads[]', files[0], files[0]['name']);
    const headers = new Headers({'Authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    this.http.post(`http://147.83.7.159:3000/users/image/add/${tempId}`, formData, options)
      .map((res: Response) => {
        res.json();
        this.alerts.pop();
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Imagen cambiada!',
        });
      })
      .subscribe(data => { console.log(data); sessionStorage.setItem('user', JSON.stringify(data));
      });
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  createFormControls() {
    this.nameControl = new FormControl('', [
      Validators.required,
      CustomValidators.rangeLength([4, 20])
    ]);
    this.emailControl = new FormControl('', [
      Validators.required,
      CustomValidators.email
    ]);
    this.passwordControl = new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
      CustomValidators.rangeLength([6, 20])
    ]);
    this.passwordControl2 = new FormControl('', [
      Validators.required,
      // Validators.minLength(8),
      CustomValidators.rangeLength([6, 20]),
      CustomValidators.equalTo(this.passwordControl)
    ]);
  }

  createForm() {
    this.myform = new FormGroup({
      nameControl: this.nameControl,
      emailControl: this.emailControl,
      passwordControl: this.passwordControl,
      passwordControl2: this.passwordControl2
    });
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
