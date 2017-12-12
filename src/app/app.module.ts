import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
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
import {CompaniesComponent} from './Views/companies/companies.component';
import {FilterByPipe} from './Views/products/filter.pipe';
import {CompaniesAppleComponent} from './Views/companiesTypes/apple/apple.component';
import {CompaniesSamsungComponent} from './Views/companiesTypes/samsung/samsung.component';
import {CompaniesLgComponent} from './Views/companiesTypes/lg/lg.component';
import {CompaniesHpComponent} from './Views/companiesTypes/hp/hp.component';
import {CompaniesAsusComponent} from './Views/companiesTypes/asus/asus.component';
import {ContactComponent} from './Views/contact/contact.component';
import {CompaniesOthersComponent} from './Views/companiesTypes/others/others.component';

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
    RankingTabletComponent,
    DetailProductComponent,
    CompaniesComponent,
    CompaniesAppleComponent,
    CompaniesSamsungComponent,
    CompaniesLgComponent,
    CompaniesHpComponent,
    CompaniesAsusComponent,
    CompaniesOthersComponent,
    ContactComponent,
    FilterByPipe
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
  providers: [
    { provide: LOCALE_ID, useValue: 'es-ES' }, // replace "en-US" with your locale
  ],
  entryComponents: [ LoginFormComponent ]
})
export class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
