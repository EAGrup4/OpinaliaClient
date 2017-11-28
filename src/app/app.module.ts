import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, NgModel} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Views/navbar/navbar.component';
import { LoginFormComponent } from './Views/login-form/login-form.component';
import { TableUsersComponent } from './Views/adminPage/table-users/table-users.component';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {HttpClientModule} from '@angular/common/http';
import {ModalModule} from 'angular2-modal';
import {routing} from './app.routes';
import {FooterComponent} from './Views/footer/footer.component';
import {PrincipalComponent} from './Views/principal/principal.component';
import {ProductsComponent} from './Views/products/products.component';
import {ProductDetailComponent} from './Views/product-detail/product-detail.component';
import {TableProductsComponent} from './Views/adminPage/table-products/table-products.component';
import {EditProfileComponent} from './Views/edit-profile/edit-profile.component';
import {MobileComponent} from './Views/productsTypes/mobile/mobile.component';
import {LaptopComponent} from './Views/productsTypes/laptop/laptop.component';
import {TabletComponent} from './Views/productsTypes/tablet/tablet.component';
import {DesktopComponent} from './Views/productsTypes/desktop/desktop.component';
import {AccessoriesComponent} from './Views/productsTypes/accessories/accessories.component';
import {DetailProductComponent} from './Views/detailProduct/detailProduct.component';
import {RankingComponent} from './Views/ranking/ranking.component';
import {RankingAccessoriesComponent} from './Views/rankingTypes/accessories2/accessories2.component';
import {RankingDesktopComponent} from './Views/rankingTypes/desktop2/desktop2.component';
import {RankingLaptopComponent} from './Views/rankingTypes/laptop2/laptop2.component';
import {RankingMobileComponent} from './Views/rankingTypes/mobile2/mobile2.component';
import {RankingTabletComponent} from './Views/rankingTypes/tablet2/tablet2.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginFormComponent,
    TableUsersComponent,
    TableProductsComponent,
    FooterComponent,
    PrincipalComponent,
    ProductsComponent,
    ProductDetailComponent,
    EditProfileComponent,
    MobileComponent,
    LaptopComponent,
    TabletComponent,
    DesktopComponent,
    AccessoriesComponent,
    DetailProductComponent,
    RankingComponent,
    RankingAccessoriesComponent,
    RankingDesktopComponent,
    RankingLaptopComponent,
    RankingMobileComponent,
    RankingTabletComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    routing
  ],
  bootstrap: [AppComponent],
  entryComponents: [ LoginFormComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
