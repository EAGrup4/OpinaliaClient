import {Component, OnInit, Input} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {IAlert} from '../adminPage/table-users/table-users.component';



@Component({
  moduleId: module.id,
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [ProductService, UserService]
})
export class ContactComponent implements OnInit {
  public nameC;
  public emailC;
  public bodyC;
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
  postMessage () {
    console.log(this.nameC);
    console.log(this.emailC);
    console.log(this.bodyC);
    const messageToSend = {name: '', email: '', message: '' };
    messageToSend.name = this.nameC;
    messageToSend.email = this.emailC;
    messageToSend.message = this.bodyC;
    this.userService.sendMessage(messageToSend).subscribe(
      (data) => {
        console.log(data);
        this.alerts.pop();
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Mensaje enviado',
        });
      },
      (err) => {
        if (err.status = 400) {
          let errorMessage: string;
          /*for (let entry of err.message) {
            console.log(entry);
            errorMessage = errorMessage.concat(entry.msg + '/n');
          }*/
          this.alerts.pop();
          this.alerts.push({
            id: 2,
            type: 'danger',
            // message: errorMessage,
            message: 'Introduce los datos correctamente!'
          });
        }else {
          console.log(err.status);
          this.alerts.pop();
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'No se ha podido enviar el mensaje!',
          });
        }
      }
    );
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
}
