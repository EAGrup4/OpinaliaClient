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
import {RankingComponent} from './Views/ranking/ranking.component';
import {RankingAccessoriesComponent} from './Views/rankingTypes/accessories2/accessories2.component';
import {RankingDesktopComponent} from './Views/rankingTypes/desktop2/desktop2.component';
import {RankingTabletComponent} from './Views/rankingTypes/tablet2/tablet2.component';
import {RankingLaptopComponent} from './Views/rankingTypes/laptop2/laptop2.component';
import {RankingMobileComponent} from './Views/rankingTypes/mobile2/mobile2.component';
import {CompaniesComponent} from './Views/companies/companies.component';

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
    path: 'productDetail', component: DetailProductComponent
  },
  {
    path: 'ranking', component: RankingComponent
  },
  {
    path: 'ranking/mobile', component: RankingMobileComponent
  },
  {
    path: 'ranking/laptop', component: RankingLaptopComponent
  },
  {
    path: 'ranking/tablet', component: RankingTabletComponent
  },
  {
    path: 'ranking/desktop', component: RankingDesktopComponent
  },
  {
    path: 'ranking/accessories', component: RankingAccessoriesComponent
  },
  {
    path: 'companies', component: CompaniesComponent
  },
];
export const routing = RouterModule.forRoot(routes);
