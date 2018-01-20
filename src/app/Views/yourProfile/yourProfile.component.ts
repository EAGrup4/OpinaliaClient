import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../classes/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-yourProfile',
  templateUrl: './yourProfile.component.html',
  styleUrls: ['./yourProfile.component.css'],
  providers: [UserService]
})
export class YourProfileComponent implements OnInit {
  savedUser = sessionStorage.getItem('user');
  user = new User('', '', '', '', false, '', '');
  image: any;
  imagePrev: any;
  userIt: any;
  @Input()
  public alerts: Array<IAlert> = [];
  private backup: Array<IAlert>;
  constructor(private userService: UserService, private router: Router) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  ngOnInit() {
    this.user = JSON.parse(this.savedUser);
    console.log(this.user);
    this.imagePrev = this.user.profileImage;
    this.image = this.user.profileImage;
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
