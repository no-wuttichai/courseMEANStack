import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Location } from '@angular/common';
import { StockEditComponent } from '../stock-edit/stock-edit.component';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct = new Product();
  imageSrc: string | ArrayBuffer;

  constructor(private location: Location) {
    this.mProduct.name = "";
    this.mProduct.price = 0;
    this.mProduct.stock = 0;
  }

  ngOnInit() {
  }

  onSubmit() {
    // alert(this.mProduct.name);
    console.log(this.mProduct);

  }

  onCancel() {
    this.location.back();
  }

  onUpload(event) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      const reader = new FileReader();
      reader.readAsDataURL(metaImage);
      reader.onload = () => {
        this.imageSrc = reader.result;
        this.mProduct.image = metaImage;
      };
    }
  }

}
