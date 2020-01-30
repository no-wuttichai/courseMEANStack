import { Component, OnInit } from '@angular/core';
import { Product, ProductResult } from 'src/app/models/product.model';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-shop-home',
  templateUrl: './shop-home.component.html',
  styleUrls: ['./shop-home.component.css']
})
export class ShopHomeComponent implements OnInit {
  mProductArray = new Array<ProductResult>();
  mOrderArray = new Array<Product>();
  mTotalPrice = 0;
  mIsPaymentShow = false;

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    this.feedData();
  }

  feedData() {
    this.networkService.getProductAll().subscribe(
      data => {
        const products = data.result as ProductResult[];
        this.mProductArray = products.map(item => {
          item.image = this.networkService.getImage(item.image);
          return item
        })
      },
      error => {
        console.log(JSON.stringify(error));
      }
    );
  }

  // Products item Begin
  onClickAddOrder(item: Product, isDecrease: Boolean) {
    if (this.mOrderArray.indexOf(item) !== -1) {
      if (isDecrease) {
        if (item.qty > 1) {
          item.qty--;
        }
      } else {
        item.qty++;
      }
    } else {
      item.qty = 1;
      // Inserts new elements at the start of an array.
      this.mOrderArray.unshift(item);
    }
    this.countSumPrice();
  }

  countSumPrice() {
    this.mTotalPrice = 0;
    this.mOrderArray.forEach(item => {
      this.mTotalPrice += item.price * item.qty;
    });
  }

  isSelectedItem(item: Product) {
    return this.mOrderArray.indexOf(item) !== -1;
  }
  // Products item End

  // Orders Begin
  onClickRemoveOrder(item: Product) {
    // [11, 22, 33, 44, 55] splice(1 #index, 2 #count) > [11, 44, 55]
    this.mOrderArray.splice(this.mOrderArray.indexOf(item), 1);
    this.countSumPrice();

    if (this.mTotalPrice === 0 && this.mIsPaymentShow === true) {
      this.mIsPaymentShow = !this.mIsPaymentShow;
    }
  }

  onClickPayment() {
    if (this.mTotalPrice > 0) {
      this.mIsPaymentShow = !this.mIsPaymentShow;
    } else {
      alert('At least single order is requied!');
    }
  }

  onPaymentCompleted() {
    this.mProductArray = [];
    this.mOrderArray = [];
    this.mTotalPrice = 0;
    this.mIsPaymentShow = false;

    this.feedData();
  }
  // Orders End

}