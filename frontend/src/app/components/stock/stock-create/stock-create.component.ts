import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Location } from '@angular/common';
import { StockEditComponent } from '../stock-edit/stock-edit.component';
import { NetworkService } from 'src/app/services/network.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct = new Product();
  imageSrc: string | ArrayBuffer;

  constructor(private location: Location, private networkService: NetworkService) {
    this.mProduct.name = "";
    this.mProduct.price = 0;
    this.mProduct.stock = 0;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.networkService.addProduct(this.mProduct).subscribe(
      result => {
        this.location.back()
      }, error => {
        Swal.fire(error.error.message)
      }
    )

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
