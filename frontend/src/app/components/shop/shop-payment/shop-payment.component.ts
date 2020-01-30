import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shop-payment',
  templateUrl: './shop-payment.component.html',
  styleUrls: ['./shop-payment.component.css']
})
export class ShopPaymentComponent implements OnInit {

  @Input('total') totalPayment: number;
  @Output('payment') submitPayments = new EventEmitter<void>();

  constructor() { }

  onPayment() {
    this.submitPayments.emit();
  }

  ngOnInit() {
  }

}
