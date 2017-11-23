import {Routes, RouterModule} from '@angular/router';
import {NavbarComponent} from './Views/navbar/navbar.component';
import {LoginFormComponent} from './Views/login-form/login-form.component';
import {TableUsersComponent} from './Views/adminPage/table-users/table-users.component';
import {ProductsComponent} from './Views/products/products.component';
import {ProductDetailComponent} from './Views/product-detail/product-detail.component';
import {EditProfileComponent} from './Views/edit-profile/edit-profile.component';
import {PrincipalComponent} from './Views/principal/principal.component';
import {MobileComponent} from './Views/productsTypes/mobile/mobile.component';
import {LaptopComponent} from './Views/productsTypes/laptop/laptop.component';
import {TabletComponent} from './Views/productsTypes/tablet/tablet.component';
import {DesktopComponent} from './Views/productsTypes/desktop/desktop.component';
import {AccessoriesComponent} from './Views/productsTypes/accessories/accessories.component';
import {DetailProductComponent} from './Views/detailProduct/detailProduct.component';

const routes: Routes = [
  {
    path: '', component: PrincipalComponent
  },
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
  {
    path: 'products/mobile', component: MobileComponent
  },
  {
    path: 'products/laptop', component: LaptopComponent
  },
  {
    path: 'products/tablet', component: TabletComponent
  },
  {
    path: 'products/desktop', component: DesktopComponent
  },
  {
    path: 'products/accessories', component: AccessoriesComponent
  },
  {
    path: 'productDetail', component: DetailProductComponent, data: { product: 'this.product'}
  }
];
export const routing = RouterModule.forRoot(routes);
