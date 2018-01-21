import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../classes/product.model';
import {Subject} from 'rxjs/Subject';
import {ProductService} from '../../../services/product.service';
import {IAlert} from '../table-users/table-users.component';
import {Specifications} from '../../../classes/specifications.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css'],
  providers: [ProductService],
})

export class TableProductsComponent implements OnInit {
  desktop: FormGroup;
  laptop: FormGroup;
  tablet: FormGroup;
  phone: FormGroup;
  products = new Product('', '', '', [], null, [], null, '', null, null, null);
  productsSend = {name: '', category: '', company: ''};
  objectsFilter = {name: '', category: '', company: ''};
  productsMody = {name: '', category: '', company: '', _id: ''};
  specs: { name: string, spec: string } = { name: '', spec: '' };
  specs1: { name: string, spec: string } = { name: '', spec: '' };
  specs2: { name: string, spec: string } = { name: '', spec: '' };
  specs3: { name: string, spec: string } = { name: '', spec: '' };
  specs4: { name: string, spec: string } = { name: '', spec: '' };
  specs5: { name: string, spec: string } = { name: '', spec: '' };
  specs6: { name: string, spec: string } = { name: '', spec: '' };
  specs7: { name: string, spec: string } = { name: '', spec: '' };
  spec: any = [];
  proc1: string; ram1: string; disk1: string; graphic1: string; so1: string; proc2: string; screen2: string;
  ram2: string; disk2: string; graphic2: string; gr2: string; so2: string; proc3: string; screen3: string; ram3: string; disk3: string;
  gr3: string; cam3: string; so3: string; proc4: string; screen4: string; ram4: string; disk4: string; gr4: string; cam4: string;
  so4: string;
  names1: string; names2: string; names3: string; names4: string; names5: string; names6: string; names7: string;
  spec1: string; spec2: string; spec3: string; spec4: string; spec5: string; spec6: string; spec7: string;
  proc11: string; ram11: string; disk11: string; graphic11: string; so11: string; proc12: string; screen12: string;
  ram12: string; disk12: string; graphic12: string; gr12: string; so12: string; proc13: string; screen13: string; ram13: string; disk13: string;
  gr13: string; cam13: string; so13: string; proc14: string; screen14: string; ram14: string; disk14: string; gr14: string; cam14: string;
  so14: string;
  names11: string; names12: string; names13: string; names14: string; names15: string; names16: string; names17: string;
  spec11: string; spec12: string; spec13: string; spec14: string; spec15: string; spec16: string; spec17: string;
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  constructor(private productService: ProductService, private http: Http, private fb: FormBuilder) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  product: any;
  error: string;
  id: string; nameE: string; categoryE: string; companyE: string;
  index: number;
  data: any;
  arrayObjects: any[] = [];
  arrayNames: any[] = [];
  delate = new Product('', '', '', [], null, [], null, '', null, null, null);
  fieldArray: Array<any> = [];
  newAttribute: any = {};
  tableDesktop = false; tableLaptop = false; tableMobile = false; tableTablet = false; tableAccessories = false;
  url = '';
  filesToUpload: Array<File> = [];
  sendtoken = JSON.parse(sessionStorage.getItem('token'));
  ngOnInit() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.fieldArray.pop();
    }
  }
  showProducts() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
  }
  passIndex(id: string, name: string, i: number) {
    this.products._id = id;
    this.products.name = name;
    this.index = i;
  }
  deleteUsers(id: string) {
    this.products._id = id;
    console.log(id);
    this.productService.deleteProduct(id).subscribe(
      (data) => {
        console.log(data);
        this.product.splice(this.index, 1);
      });
  }
  passID(id: string, name: string, category: string, company: string, image: string) {
    this.id = id;
    console.log('este es el', id);
    this.nameE = name;
    this.categoryE = category;
    this.companyE = company;
    this.url = image;
  }
  modifyProducts(name: string, category: string, company: string) {
    this.productsMody.category = category;
    this.productsMody.name = name;
    this.productsMody.company = company;
    this.productsMody._id = this.id;
    console.log(this.productsMody);
    this.productService.modifyProduct(this.productsMody).subscribe(
      (data) => {
        console.log(data);
        this.error = data.name;
        this.showProducts();
        this.alerts.pop();
        this.alerts.push({
          id: 1,
          type: 'success',
          message: 'Producto Modificado!',
        });
        },
      (err) => {
        console.log(err);
        this.alerts.pop();
        this.alerts.push({
          id: 2,
          type: 'danger',
          message: 'No se ha podido modificar el producto!',
        });
      });
  }
  addProduct(name: string, category: string, company: string) {
    console.log('SPEC', this.spec);
    this.productsSend.category = category;
    this.productsSend.name = name;
    this.productsSend.company = company;
    console.log(this.productsSend);
    this.productService.addProduct(this.productsSend).subscribe(
      (data) => {
        console.log(data);
        if (this.error === 'CastError') {
          this.alerts.pop();
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Error al añadir producto',
          });
        } else {
          this.alerts.pop();
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Producto Añadido!',
          });
          this.showProducts();
        }
      }
    );
    for (let i = 0; i < this.fieldArray.length; i++) {
      this.fieldArray.pop();
    }
    this.tableDesktop = false; this.tableLaptop = false; this.tableMobile = false; this.tableTablet = false; this.tableAccessories = false;
  }
  addFieldValue() {
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {};
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }
  showSpecifi() {
    console.log(this.fieldArray);
    console.log('ESTE', this.spec);
  }
  showTypeTable(category) {
    if (category === 'desktop') {
      this.tableDesktop = true;
      this.tableAccessories = false;
      this.tableLaptop = false;
      this.tableMobile = false;
      this.tableTablet = false;
    } else if (category === 'laptop') {
      this.tableDesktop = false;
      this.tableAccessories = false;
      this.tableLaptop = true;
      this.tableMobile = false;
      this.tableTablet = false;
    } else if (category === 'phone') {
      this.tableDesktop = false;
      this.tableAccessories = false;
      this.tableLaptop = false;
      this.tableMobile = true;
      this.tableTablet = false;
    } else if (category === 'accessories') {
      this.tableDesktop = false;
      this.tableAccessories = true;
      this.tableLaptop = false;
      this.tableMobile = false;
      this.tableTablet = false;
    } else if (category === 'tablet') {
      this.tableDesktop = false;
      this.tableAccessories = false;
      this.tableLaptop = false;
      this.tableMobile = false;
      this.tableTablet = true;
    }
  }
  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }
  sortByName() {
    this.productService.getProduct().subscribe(
      (data) => {

        this.data = data.sort();
        this.data.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.clearArrayOfObjects();
        this.clearArrayOfNames();
        this.product = this.data;
        console.log(this.product);
      });
  }
  sortByCompany() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.data = data.sort();
        this.data.sort(function (a, b) {
          if (a.company > b.company) {
            return 1;
          }
          if (a.company < b.company) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.clearArrayOfObjects();
        this.clearArrayOfNames();
        this.product = this.data;
        console.log(this.product);
      });
  }
  sortByCategory() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.data = data.sort();
        this.data.sort(function (a, b) {
          if (a.category > b.category) {
            return 1;
          }
          if (a.category < b.category) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        this.clearArrayOfObjects();
        this.clearArrayOfNames();
        this.product = this.data;
        console.log(this.product);
      });
  }
  checkCheck(check: boolean, object: any) {
    this.delate = object;
    console.log(this.delate);
    if (check) {// if the checkbox is selected
      if (this.arrayObjects.findIndex(item => item === object._id) === -1) { // this if checks if the id exists alredy in the array
        this.arrayObjects.push(object._id);
        this.arrayNames.push(object.name);
      }else {
        return;
      }
      console.log(this.arrayObjects);
      console.log(this.arrayNames);
    }else if (!check) {
      this.arrayObjects = this.arrayObjects.filter(item => item !== object._id);
      this.arrayNames = this.arrayNames.filter(item => item !== object.name);
      console.log(this.arrayObjects);
    }
  }
  deleteSelected() {
    this.arrayObjects.forEach(id => {
      this.productService.deleteProduct(id).subscribe(
        (data) => {
          console.log(data);
          this.product.splice(this.index, 1);
        });
    });
    this.clearArrayOfObjects();
    this.clearArrayOfNames();
    this.showProducts();
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
  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    var tempId = this.id;
    console.log(tempId);
    formData.append('uploads[]', files[0], files[0]['name']);
    const headers = new Headers({'Authorization': this.sendtoken });
    const options = new RequestOptions({ headers: headers });
    this.http.post(`http://localhost:3000/products/image/add/${tempId}`, formData, options)
      .map((res: Response) => res.json())
      .subscribe(data => {console.log(data);
      });
  }
  /*private category: string, proc1: string, ram1: string, disk1: string, graphic1: string, so1: string, proc2: string, screen2: string,
  ram2: string, disk2, graphic2: string, gr2: string, so2: string, proc3: string, screen3: string, ram3: string, disk3: string,
  gr3: string, cam3: string, so3: string, proc4: string, screen4: string, ram4: string, disk4: string, gr4: string, cam4: string,
  so4: string*/
  passSpec(category) {
    for (let i = 0; i < 7; i++) {
      this.spec.pop();
    }
    if (category === 'desktop') {
      this.specs.name = 'Procesador';
      this.specs.spec = this.proc1;
      this.spec.push(this.specs);
      this.specs1.name = 'Memoria Ram';
      this.specs1.spec = this.ram1;
      this.spec.push(this.specs1);
      this.specs2.name = 'Disco Duro';
      this.specs2.spec = this.disk1;
      this.spec.push(this.specs2);
      this.specs3.name = 'Tarjeta Grafica';
      this.specs3.spec = this.graphic1;
      this.spec.push(this.specs3);
      this.specs4.name = 'Sistema Operativo';
      this.specs4.spec = this.so1;
      this.spec.push(this.specs4);
      console.log(this.spec);
    } else if ( category === 'laptop') {
      this.specs.name = 'Procesador';
      this.specs.spec = this.proc2;
      this.spec.push(this.specs);
      this.specs1.name = 'Pantalla';
      this.specs1.spec = this.screen2;
      this.spec.push(this.specs1);
      this.specs2.name = 'Memoria Ram';
      this.specs2.spec = this.ram2;
      this.spec.push(this.specs2);
      this.specs3.name = 'Disco Duro';
      this.specs3.spec = this.disk2;
      this.spec.push(this.specs3);
      this.specs4.name = 'Tarjeta Grafica';
      this.specs4.spec = this.graphic2;
      this.spec.push(this.specs4);
      this.specs5.name = 'Peso';
      this.specs5.spec = this.gr2;
      this.spec.push(this.specs5);
      this.specs6.name = 'Sistema Operativo';
      this.specs6.spec = this.so2;
      this.spec.push(this.specs6);
    } else if ( category === 'tablet') {
      this.specs.name = 'Procesador';
      this.specs.spec = this.proc3;
      this.spec.push(this.specs);
      this.specs1.name = 'Pantalla';
      this.specs1.spec = this.screen3;
      this.spec.push(this.specs1);
      this.specs2.name = 'Memoria Ram';
      this.specs2.spec = this.ram3;
      this.spec.push(this.specs2);
      this.specs3.name = 'Disco Duro';
      this.specs3.spec = this.disk3;
      this.spec.push(this.specs3);
      this.specs4.name = 'Peso';
      this.specs4.spec = this.gr3;
      this.spec.push(this.specs4);
      this.specs5.name = 'Camara';
      this.specs5.spec = this.cam3;
      this.spec.push(this.specs5);
      this.specs6.name = 'Sistema Operativo';
      this.specs6.spec = this.so3;
      this.spec.push(this.specs6);
    } else if ( category === 'phone') {
      this.specs.name = 'Procesador';
      this.specs.spec = this.proc4;
      this.spec.push(this.specs);
      this.specs1.name = 'Pantalla';
      this.specs1.spec = this.screen4;
      this.spec.push(this.specs1);
      this.specs2.name = 'Memoria Ram';
      this.specs2.spec = this.ram4;
      this.spec.push(this.specs2);
      this.specs3.name = 'Disco Duro';
      this.specs3.spec = this.disk4;
      this.spec.push(this.specs3);
      this.specs4.name = 'Peso';
      this.specs4.spec = this.gr4;
      this.spec.push(this.specs4);
      this.specs5.name = 'Camara';
      this.specs5.spec = this.cam4;
      this.spec.push(this.specs5);
      this.specs6.name = 'Sistema Operativo';
      this.specs6.spec = this.so4;
      this.spec.push(this.specs6);
    } else if (category === 'accessories') {
      this.specs.name = this.names1;
      this.specs.spec = this.spec1;
      this.spec.push(this.specs);
      this.specs1.name = this.names2;
      this.specs1.spec = this.spec2;
      this.spec.push(this.specs1);
      this.specs2.name = this.names3;
      this.specs2.spec = this.spec3;
      this.spec.push(this.specs2);
      this.specs3.name = this.names4;
      this.specs3.spec = this.spec4;
      this.spec.push(this.specs3);
      this.specs4.name = this.names5;
      this.specs4.spec = this.spec5;
      this.spec.push(this.specs4);
      this.specs5.name = this.names6;
      this.specs5.spec = this.spec6;
      this.spec.push(this.specs5);
      this.specs6.name = this.names7;
      this.specs6.spec = this.spec7;
      this.spec.push(this.specs6);
    }
    console.log(this.spec);
    this.productService.addSpecs(this.id, this.spec).subscribe(
      (data) => {
        console.log(data);
      }
    );
  }
  private clearArrayOfObjects() {
    for (let i = -1; i <= this.arrayObjects.length + 1; i++) {
      this.arrayObjects.forEach(item => {
        this.arrayObjects.pop();
      });
    }
    this.arrayObjects.pop();
  }
  private clearArrayOfNames() {
    for (let i = -1; i <= this.arrayNames.length + 1; i++) {
      this.arrayNames.forEach(item => {
        this.arrayNames.pop();
      });
    }
    this.arrayNames.pop();
  }
}
export interface IAlert {
  id: number;
  type: string;
  message: string;
}
