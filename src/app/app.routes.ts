import {Routes, RouterModule} from '@angular/router';
import {NavbarComponent} from './Views/navbar/navbar.component';
import {LoginFormComponent} from './Views/login-form/login-form.component';
import {TableUsersComponent} from './Views/adminPage/table-users/table-users.component';
import {ProductsComponent} from './Views/products/products.component';
import {ProductDetailComponent} from './Views/product-detail/product-detail.component';
import {EditProfileComponent} from './Views/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'login-form', component: LoginFormComponent
  },
  {
    path: 'admin', component: TableUsersComponent
  },
  {
    path: 'products', component: ProductsComponent
  },
  {
    path: 'edit-profile', component: EditProfileComponent
  },
];
export const routing = RouterModule.forRoot(routes);
