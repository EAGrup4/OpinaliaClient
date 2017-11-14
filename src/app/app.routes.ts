import {Routes, RouterModule} from '@angular/router';
import {NavbarComponent} from './Views/navbar/navbar.component';
import {LoginFormComponent} from './Views/login-form/login-form.component';
import {TableUsersComponent} from './Views/table-users/table-users.component';

const routes: Routes = [
  {
    path: 'login-form', component: LoginFormComponent
  },
  {
    path: 'table-users', component: TableUsersComponent
  }
];
export const routing = RouterModule.forRoot(routes);
