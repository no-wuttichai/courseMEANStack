import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product, ProductResult, ProductResponse } from 'src/app/models/product.model';
import { StockCreateComponent } from '../stock-create/stock-create.component';
import { Subject } from 'rxjs';
import { NetworkService } from 'src/app/services/network.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})

export class StockEditComponent implements OnInit {

  mProduct = new Product();
  imageSrc: string | ArrayBuffer;
  // mProduct: ProductResult;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private location: Location, 
    private networkService: NetworkService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // alert(params.id);
      this.feedData(params.id);
    });
  }

  feedData(id: string) {
    this.networkService.getProductById(id).subscribe(
      result => {
        let items = result.result as ProductResult;
        this.imageSrc = this.networkService.getImage(items.image)
        this.mProduct = items
      }, error => {
        Swal.fire(error.error.message)
        // alert(error.error.message)
      }
    )
  }

  onCancel() {
    this.location.back();
  }

  onSubmit() {
    this.networkService.editProduct(this.mProduct.product_id.toString(), this.mProduct).subscribe(
      result => {
          this.location.back();
      },
      error => {
        alert(error.error.message);
      }
    )
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
