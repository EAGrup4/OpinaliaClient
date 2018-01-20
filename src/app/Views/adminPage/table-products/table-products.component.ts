import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../classes/product.model';
import {Subject} from 'rxjs/Subject';
import {ProductService} from '../../../services/product.service';
import {IAlert} from '../table-users/table-users.component';
import {Specifications} from '../../../classes/specifications.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css'],
  providers: [ProductService],
})

export class TableProductsComponent implements OnInit {
  products = new Product('', '', '', [], null, [], null, '', null, null, null);
  productsSend = {name: '', category: '', company: '', specifications: Specifications['']};
  objectsFilter = {name: '', category: '', company: ''};
  productsMody = {name: '', category: '', company: '', specifications: Specifications[''], _id: ''};
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  spec = new Specifications('', '', '', '', '', '', '', '');
  constructor(private productService: ProductService, private http: Http) {
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
    this.nameE = name;
    this.categoryE = category;
    if (category === 'desktop') {

    }
    this.companyE = company;
    this.url = image;
  }
  modifyProducts(name: string, category: string, company: string) {
    this.productsMody.category = category;
    this.productsMody.name = name;
    this.productsMody.company = company;
    this.productsMody._id = this.id;
    this.productsMody.specifications = this.spec;
    if (this.productsMody.specifications.procesador === '') {
      this.productsMody.specifications = '';
      this.productsMody.specifications = this.fieldArray;
    }
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
    this.productsSend.category = category;
    this.productsSend.name = name;
    this.productsSend.company = company;
    this.productsSend.specifications = this.spec;
    if (this.productsSend.specifications.procesador === '') {
      this.productsSend.specifications = '';
      this.productsSend.specifications = this.fieldArray;
    }
    console.log(this.productsSend);
    console.log('SPECIFIC', this.productsSend.specifications);
    this.productService.addProduct(this.productsSend).subscribe(
      (data) => {
        console.log(data);
        // this.error = data.name; ARREGLAR SI SE PRODUCE ALGUN ERROR
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
