import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../classes/product.model';
import {Subject} from 'rxjs/Subject';
import {ProductService} from '../../../services/product.service';
import {IAlert} from '../table-users/table-users.component';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.css'],
  providers: [ProductService],
})

export class TableProductsComponent implements OnInit {
  products = new Product('', '', '', [], null, [], null, '', null, null, null);
  productsSend = {name: '', category: '', company: ''};
  objectsFilter = {name: '', category: '', company: ''};
  productsMody = {name: '', category: '', company: '', _id: ''};
  @Input()
  public alerts: Array<IAlert> = [];
  private _success = new Subject<string>();
  private backup: Array<IAlert>;
  constructor(private productService: ProductService) {
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  product: any;
  error: string;
  id: string;
  index: number;
  data: any;
  arrayObjects: any[] = [];
  arrayNames: any[] = [];
  delate = new Product('', '', '', [], null, [], null, '', null, null, null);
  ngOnInit() {
    this.productService.getProduct().subscribe(
      (data) => {
        this.product = data;
        console.log(data);
      });
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
  passID(id: string) {
    this.id = id;
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
    console.log(this.productsSend);
    this.productService.addProduct(this.productsSend).subscribe(
      (data) => {
        console.log(data);
        // this.error = data.name; ARREGLAR SI SE PRODUCE ALGUN ERROR
        if (this.error === 'CastError') {
          this.alerts.push({
            id: 2,
            type: 'danger',
            message: 'Error al añadir producto',
          });
        } else {
          this.alerts.push({
            id: 1,
            type: 'success',
            message: 'Producto Añadido!',
          });
        }
      }
    );
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
