import {Component, OnInit, Input} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../classes/user.model';
import {Location} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  userIt: any;
  userSaved = sessionStorage.getItem('userClick');
  image: any;
  constructor(private _location: Location, private userService: UserService, private router: Router) {
  }
  ngOnInit() {
    this.userService.getTheUser(this.userSaved).subscribe(
      (data) => {
        console.log(data);
        this.userIt = data[0];
        console.log(this.userIt);
        if (this.userIt.profileImage === '') {
          this.image = '../../../assets/images/silueta.png';
        } else {
          this.image = this.userIt.profileImage;

          let reader = new FileReader();

          reader.onload = (e: any) => {
            this.image = e.target.result;
          };

          reader.readAsDataURL(this.userIt.profileImage);
        }
      });
  }
  goBack() {
    this._location.back();
    localStorage.setItem('searchedProd', '');
  }
}
