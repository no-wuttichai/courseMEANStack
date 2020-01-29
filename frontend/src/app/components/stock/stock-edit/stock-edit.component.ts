import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from 'src/app/models/product.model';
import { StockCreateComponent } from '../stock-create/stock-create.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  mProduct = new Product();
  imageSrc: string | ArrayBuffer;

  constructor(private activatedRoute: ActivatedRoute, private location: Location) { 
    
  }

  ngOnInit() {

    console.log(this.mProduct.name);
    
    this.activatedRoute.params.subscribe(params => {
      // alert(params.id);
    });
  }

  onCancel() {
    this.location.back();
  }

}
